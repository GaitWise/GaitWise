import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey_inquiry } from '../../../services/survey/customsurvey';
import Surveytemplate from "../../../components/survey/Surveytemplate";

/* [Screen] SelectionPage */
const SelectionPage = () => {
  const router = useRouter();
  const answersRef = useRef([]); 
  const { projectId } = useLocalSearchParams(); 
  const [surveyData, setSurveyData] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [responseState, setResponseState] = useState(null); 

  /* [Effect] 설문 데이터 가져오기 */
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        if (!projectId) {
          console.error('Project ID is required.');
          return;
        }

        // 설문 데이터 API 호출
        const response = await Survey_inquiry(projectId);
        console.log("response:", response);

        setResponseState(response); // 전체 응답 데이터를 상태에 저장

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
          // 텍스트 응답 설문으로 이동
          router.push({
            pathname: '/survey/text_response',
            params: { 
              textResponse: JSON.stringify(text_responseData),
              fullResponse: JSON.stringify(response),
            },
          });
        } else {
          Alert.alert(
            'No Survey Data',
            'There is no available survey data for this project.',
            [{ text: 'OK', onPress: () => router.push('home') }],
            { cancelable: false }
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

  /* [Function] 사용자가 선택한 답변을 저장하는 함수 */
  const handleAnswer = (answer) => {
    const updatedAnswers = [...answersRef.current];
    updatedAnswers[currentIndex] = {
      question: surveyData?.selection[currentIndex]?.content, 
      options: surveyData?.selection[currentIndex]?.options || [], 
      type: surveyData?.selection[currentIndex]?.type || '', 
      answer: Array.isArray(answer) ? answer : [answer], 
    };
    answersRef.current = updatedAnswers; // 최신 답변 업데이트
  };

  /* [Function] 다음 설문 페이지로 이동 함수 */
  const handleNextPage = () => {
    if (currentIndex < (surveyData?.selection.length || 0) - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (surveyData?.text_response?.length > 0) {
      router.push({
        pathname: '/survey/text_response',
        params: {
          textResponse: JSON.stringify(surveyData.text_response),
          answers: JSON.stringify(answersRef.current), 
          fullResponse: JSON.stringify(responseState), 
        },
      });
    } else {
      Alert.alert(
        'No Further Survey Data',
        'There is no more survey data available.',
        [{ text: 'OK', onPress: () => router.push('home') }],
        { cancelable: false }
      );
    }
  };

  /* 설문 데이터 로드 중일 때 로딩 화면 표시 */
  if (!surveyData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading survey...</Text>
      </View>
    );
  }

  /* UI */
  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData?.content,
          options: currentPageData?.options,
          type: currentPageData?.type,
          max: currentPageData?.max
        }}
        onContinue={handleNextPage}
        onAnswer={handleAnswer}
      />
    </View>
  );
};

export default SelectionPage;
