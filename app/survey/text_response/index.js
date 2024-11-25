import React, { useRef, useState } from 'react';
import { View, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Surveytemplate from "../../../components/survey/Surveytemplate";
import { Survey_save } from "../../../services/survey/customsurvey"; // Backend API call function

const TextResponsePage = () => {
  const router = useRouter();
  const { textResponse, answers, fullResponse } = useLocalSearchParams(); // Retrieve textResponse, previous answers, and full survey response

  const textResponses = textResponse ? JSON.parse(textResponse) : []; // Parse textResponse
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const textAnswersRef = useRef([]); // Store text response answers

  const currentPageData = textResponses[currentIndex]; // Current question data

  // Save all survey data to the backend
 const survey_data_save = async () => {
  try {
    // Retrieve current project data from AsyncStorage
    const storedProjectData = await AsyncStorage.getItem('currentProject');
    if (!storedProjectData) {
      console.error('No project data found in AsyncStorage.');
      Alert.alert('Error', 'No project data found.');
      return;
    }
    const parsedProjectData = JSON.parse(storedProjectData);
    console.log('Parsed current project:', parsedProjectData.project_id);

    // Retrieve user data from AsyncStorage
    const storedUserData = await AsyncStorage.getItem('finalData');
    if (!storedUserData) {
      console.error('No user data found in AsyncStorage.');
      Alert.alert('Error', 'No user data found.');
      return;
    }
    const parsedUserData = JSON.parse(storedUserData);
    console.log('Parsed user data:', parsedUserData);

    // Ensure `fullResponse` is properly parsed
    const parsedFullResponse = fullResponse ? JSON.parse(fullResponse) : {};
    if (!parsedFullResponse?.custom_survey) {
      console.error('Invalid full response data.');
      Alert.alert('Error', 'Invalid full response data.');
      return;
    }

    const previousAnswers = JSON.parse(answers);
    console.log('Previous answers:', previousAnswers);

    // Combine selection and text responses
    const allAnswers = [
      ...previousAnswers, // Previous selection answers
      ...textAnswersRef.current, // Current text response answers
    ];

    // Prepare survey data
    const surveyData = {
      project: parsedProjectData.project_id,
      essential_survey: {
        gender: parsedUserData.gender,
        age: parsedUserData.age,
        weight: {
          value: parsedUserData.weight.value,
          unit: parsedUserData.weight.type || 'kg',
        },
        height: parsedUserData.height,
        job: parsedUserData.profile.job,
      },
      custom_survey: {
        title: parsedFullResponse.custom_survey.title,
        description: parsedFullResponse.custom_survey.description,
        status: parsedFullResponse.custom_survey.status,
        selection: previousAnswers.map((item) => ({
          content: item.question,
          options: item.options || [],
          answer: item.answer,
          type: item.type, 
        })),
        text_response: textAnswersRef.current.map((item) => ({
          content: item.question,
          answer: item.answer,
        })),
      },
      participant: parsedUserData.user,
    };

    console.log('Final survey data to save:', JSON.stringify(surveyData, null, 2));

    const response = await Survey_save(surveyData);
    console.log('Survey saved successfully:', response);

    Alert.alert('Success', 'Survey data saved successfully.');
    router.push('home'); // Navigate back to home after saving
  } catch (error) {
    console.error('Error saving survey data:', error);
    Alert.alert('Error', 'Failed to save survey data.');
  }
};

  // Handle text response answers
  const handleAnswer = (answer) => {
    textAnswersRef.current[currentIndex] = {
      question: currentPageData.content, // Store the current question content
      answer: answer, // Store the user input
      type: "text_response", // Mark as a text response
    };
    console.log("Updated textAnswersRef: ", textAnswersRef.current); // Debugging: Updated answers
  };

  // Handle moving to the next page
  const handleNextPage = () => {
    if (currentIndex < textResponses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save all data to the backend on the last page
      survey_data_save();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData?.content || 'No Content Available',
          options: [] // Text responses do not have options
        }}
        onContinue={handleNextPage}
        onAnswer={handleAnswer} // Handle text responses
      />
    </View>
  );
};

export default TextResponsePage;
