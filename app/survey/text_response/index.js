import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Surveytemplate from "../../../components/survey/Surveytemplate";

const TextResponsePage = () => {
  const router = useRouter();
  const { textResponse } = useLocalSearchParams(); // 전달받은 textResponse 데이터
  const textResponses = textResponse ? JSON.parse(textResponse) : []; // 텍스트 응답 데이터 파싱
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 페이지 인덱스

  const currentPageData = textResponses[currentIndex]; // 현재 텍스트 응답 데이터

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentIndex < textResponses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('home'); // 마지막 페이지 후 홈으로 이동
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData?.content || 'No Content Available',
          options: [] // 텍스트 응답에는 선택지가 없으므로 빈 배열 전달
        }}
        onContinue={handleNextPage}
      />
    </View>
  );
};

export default TextResponsePage;
