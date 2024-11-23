import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Surveytemplate from "../../../components/survey/Surveytemplate";

const pagesdata = {
  title: "Test_Custom",
  description: "This Survey is TestSurvey",
  text_response: [
    { content: "What Is Your Goal?" },
    { content: "How Are You Feeling Today?" },
    { content: "What Is Your Dream?" },
  ],
};

const TextResponsePage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPageData = pagesdata.text_response[currentIndex]; 

  const handleNextPage = () => {
    if (currentIndex < pagesdata.text_response.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('home');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData.content,
          options: [] 
        }}
        onContinue={handleNextPage}
      />
    </View>
  );
};

export default TextResponsePage;
