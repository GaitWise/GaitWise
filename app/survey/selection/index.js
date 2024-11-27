import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey_inquiry } from '../../../services/survey/customsurvey';
import Surveytemplate from "../../../components/survey/Surveytemplate";

const SelectionPage = () => {
  const { projectId } = useLocalSearchParams(); // URL에서 projectId 가져오기
  const router = useRouter();
  const [surveyData, setSurveyData] = useState(null); // 설문 데이터 상태
  const [responseState, setResponseState] = useState(null); // 전체 응답 데이터 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 페이지 인덱스
  const answersRef = useRef([]); // 최신 답변 상태를 관리

  // 설문 데이터 가져오기
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        if (!projectId) {
          console.error('Project ID is required.');
          return;
        }

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
  console.log("currentPageData: ", currentPageData)

  console.log(currentPageData?.options)

  // 답변 저장 함수
  const handleAnswer = (answer) => {
    const updatedAnswers = [...answersRef.current];
    updatedAnswers[currentIndex] = {
      question: surveyData?.selection[currentIndex]?.content, // 질문 내용 저장
      options: surveyData?.selection[currentIndex]?.options || [], // options 추가
      type: surveyData?.selection[currentIndex]?.type || '', // type 추가
      answer: Array.isArray(answer) ? answer : [answer], // 답변을 배열로 저장
    };
    answersRef.current = updatedAnswers; // 최신 답변 업데이트
    console.log("Updated answers:", answersRef.current); // 디버깅용 로그
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    console.log("answers before next page:", answersRef.current); // 디버깅용 로그
    if (currentIndex < (surveyData?.selection.length || 0) - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (surveyData?.text_response?.length > 0) {
      router.push({
        pathname: '/survey/text_response',
        params: {
          textResponse: JSON.stringify(surveyData.text_response),
          answers: JSON.stringify(answersRef.current), // 최신 답변 데이터 전달
          fullResponse: JSON.stringify(responseState), // responseState 사용
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
