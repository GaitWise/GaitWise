import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey_inquiry } from '../../../services/survey/customsurvey';
import Surveytemplate from "../../../components/survey/Surveytemplate";

const SelectionPage = () => {
  const { projectId } = useLocalSearchParams(); // URL에서 projectId 가져오기
  const router = useRouter();
  const [surveyData, setSurveyData] = useState(null); // 설문 데이터 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 페이지 인덱스

  // 설문 데이터 가져오기
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        if (!projectId) {
          console.error('Project ID is required.');
          return;
        }

        console.log('Fetching survey data for projectId:', projectId);
        const response = await Survey_inquiry(projectId);
        console.log('Survey response:', JSON.stringify(response, null, 2));

        // response.custom_survey.selection에서 데이터를 가져옴
        const selectionData = response?.custom_survey?.selection || [];
        const text_responseData = response?.custom_survey?.text_response || [];
        
        if (selectionData.length > 0) {
          setSurveyData({
            title: response.custom_survey.title,
            description: response.custom_survey.description,
            selection: selectionData,
            text_response: text_responseData,
          });
        } else if (text_responseData.length > 0) {
          console.log('Selection data is empty. Redirecting to text_response.');
          router.push({
            pathname: '/survey/text_response',
            params: { textResponse: JSON.stringify(text_responseData) },
          });
        } else {
          console.log('No selection or text_response data found.');
          Alert.alert(
            'No Survey Data',
            'There is no available survey data for this project.',
            [
              {
                text: 'OK',
                onPress: () => router.push('home'), // 홈으로 이동
              },
            ],
            { cancelable: false } // Alert를 닫지 못하도록 강제
          );
        }
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, [projectId]);

  // 현재 페이지 데이터 가져오기
  const currentPageData = surveyData?.selection[currentIndex] || null;

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentIndex < (surveyData?.selection.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (surveyData?.text_response?.length > 0) {
      router.push({
        pathname: '/survey/text_response',
        params: { textResponse: JSON.stringify(surveyData.text_response) },
      }); // text_response 페이지로 이동
    } else {
      console.log('No text_response data. Redirecting to home.');
      Alert.alert(
        'No Further Survey Data',
        'There is no more survey data available.',
        [
          {
            text: 'OK',
            onPress: () => router.push('home'), // 홈으로 이동
          },
        ],
        { cancelable: false }
      );
    }
  };

  if (!surveyData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading survey...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData?.content,
          options: currentPageData?.options,
        }}
        onContinue={handleNextPage}
      />
    </View>
  );
};

export default SelectionPage;
