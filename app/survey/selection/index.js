import { View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Surveytemplate from "../../../components/survey/Surveytemplate";

const pagesdata = {
  title: "Test_Custom",
  description: "This Survey is TestSurvey",
  selection: [
    {
      content: "What Is Your Grade?",
      options: [
        { label: 'Freshman', value: 'Freshman' },
        { label: 'Sophomore', value: 'Sophomore' },
        { label: 'Junior', value: 'Junior' },
        { label: 'Senior', value: 'Senior' },
        { label: 'Other', value: 'Other' },
      ],
      type: "Multiple",
      max: 3,
      min: 1
    },
    {
      content: "How Would You Describe \n Your Current State Of Health?",
      options: [
        { label: 'Excellent', value: 'Excellent' },
        { label: 'Good', value: 'Good' },
        { label: 'Fair', value: 'Fair' },
        { label: 'Poor', value: 'Poor' },
      ],
      type: "Single",
      max: 1,
      min: 1
    }
  ]
};

const SelectionPage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0); 
  const currentPageData = pagesdata.selection[currentIndex]; 

  const handleNextPage = () => {
    if (currentIndex < pagesdata.selection.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/survey/text_response')
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Surveytemplate
        currentPageData={{
          title: currentPageData.content,
          options: currentPageData.options
        }}
        onContinue={handleNextPage}
      />
    </View> 
  );
};

export default SelectionPage;
