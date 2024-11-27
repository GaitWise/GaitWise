import { View, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey_save } from "../../../services/survey/customsurvey"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Surveytemplate from "../../../components/survey/Surveytemplate";

/* [Screen] TextResponsePage */
const TextResponsePage = () => {
  const router = useRouter();
  const { textResponse, answers, fullResponse } = useLocalSearchParams(); 

  const textAnswersRef = useRef([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const textResponses = textResponse ? JSON.parse(textResponse) : []; 

  const currentPageData = textResponses[currentIndex]; 

/* [Function] 모든 설문 데이터를 백엔드에 저장 함수 */
 const survey_data_save = async () => {
  try {
    // AsyncStorage에서 현재 프로젝트 데이터 가져오기
    const storedProjectData = await AsyncStorage.getItem('currentProject');
    if (!storedProjectData) {
      return;
    }
    const parsedProjectData = JSON.parse(storedProjectData);
    console.log('Parsed current project:', parsedProjectData.project_id);

    // AsyncStorage에서 사용자 데이터 가져오기
    const storedUserData = await AsyncStorage.getItem('finalData');
    if (!storedUserData) {
      console.error('No user data found in AsyncStorage.');
      return;
    }
    const parsedUserData = JSON.parse(storedUserData);

    // fullResponse 데이터 파싱
    const parsedFullResponse = fullResponse ? JSON.parse(fullResponse) : {};
    if (!parsedFullResponse?.custom_survey) {
      console.error('Invalid full response data.');
      return;
    }

    // 이전 응답 데이터 가져오기
    const previousAnswers = JSON.parse(answers);

    const allAnswers = [
      ...previousAnswers, 
      ...textAnswersRef.current, 
    ];

    
    // 최종 설문 데이터 생성
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

    const response = await Survey_save(surveyData);
    console.log('Survey saved successfully:', response);

    Alert.alert('Success', 'Survey data saved successfully.');
    router.push('home'); 
  } catch (error) {
    console.error('Error saving survey data:', error);
  }
};

  /* [Function] 텍스트 응답 저장 함수 */
  const handleAnswer = (answer) => {
    textAnswersRef.current[currentIndex] = {
      question: currentPageData.content, 
      answer: answer, 
      type: "text_response", 
    };
    console.log("Updated textAnswersRef: ", textAnswersRef.current); 
  };

  /* [Function] 다음 페이지로 이동 함수 */
  const handleNextPage = () => {
    if (currentIndex < textResponses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      survey_data_save();
    }
  };

  /* UI */
  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData?.content || 'No Content Available',
          options: [] 
        }}
        onContinue={handleNextPage}
        onAnswer={handleAnswer} 
      />
    </View>
  );
};

export default TextResponsePage;
