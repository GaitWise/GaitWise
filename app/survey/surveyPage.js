import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import { Surveytemplate } from '@/components';
import { IMAGES, COLORS } from '@/constants';
import { router } from 'expo-router';

export const SurveyPage = () => {
  const [currentPageId, setCurrentPageId] = useState('grade');

  const currentPageData = pagesData.find((page) => page.id === currentPageId);

  const goToNextPage = () => {
    if (currentPageData.nextPage) {
      setCurrentPageId(currentPageData.nextPage);
    } else {
      // 마지막 페이지일 때 홈으로 이동
      router.push('/home');
    }
  };

  const handleContinue = () => {
    goToNextPage(); // Continue 버튼 클릭 시 페이지 이동
  };

  return (
    <Surveytemplate
      currentPageData={currentPageData}
      onNextPage={goToNextPage}
      onContinue={handleContinue} // onContinue prop 전달
    />
  );
};

export default SurveyPage;

const pagesdata = {
  title: "Test_Custom",
  description: "This Survey is TestSurvey",
  selection: [
    {
      content: "What Is Your Grade?",
      option: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Other'],
      type: "Multiple",
      max: 3,
      min: 1
    },
    {
      content: "How Would You Describe \n Your Current State Of Health?",
      option: ['Excellent', 'Good', 'Fair', 'Poor'],
      type: "Single",
      max: 1,
      min: 1
    }
  ],
  text_response: [
    { content: "What Is Your Goal?"},
    { content: "How Are You Feeling Today?"},
    { content: "What Is Your Dream?"},
  ],
};


const pagesData = [
  {
    id: 'grade',
    title: 'What Is Your Grade?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Freshman', value: 'Freshman' },
      { label: 'Sophomore', value: 'Sophomore' },
      { label: 'Junior', value: 'Junior' },
      { label: 'Senior', value: 'Senior' },
      { label: 'Other', value: 'Other' },
    ],
    nextPage: 'goal', // 다음 페이지
  },
  {
    id: 'goal',
    title: 'What Is Your Goal?',
    profile_img: IMAGES.profile,
    options: [], // 옵션이 없는 페이지
    nextPage: 'health', // 다음 페이지
  },
  {
    id: 'health',
    title: 'How Would You Describe \n Your Current State Of Health?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Excellent', value: 'Excellent' },
      { label: 'Good', value: 'Good' },
      { label: 'Fair', value: 'Fair' },
      { label: 'Poor', value: 'Poor' },
    ],
    nextPage: 'feeling', // 다음 페이지
  },
  {
    id: 'feeling',
    title: 'How Are You Feeling Today?',
    profile_img: IMAGES.profile,
    options: [], // 옵션이 없는 페이지
    nextPage: 'pain', // 다음 페이지
  },
  {
    id: 'pain',
    title: 'Do You Experience \n Any Kind Of Pain?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'walking', // 다음 페이지
  },
  {
    id: 'walking',
    title: 'Have You Had \n Any Problems Walking?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'concussion', // 다음 페이지
  },
  {
    id: 'concussion',
    title: 'Have You Ever \n Had A Concussion?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'condition', // 다음 페이지
  },
  {
    id: 'condition',
    title:
      'Do You Want To Share \n Anything Else About \n Your Health Or Condition Today?',
    profile_img: IMAGES.profile,
    options: [], // 옵션이 없는 페이지
    nextPage: 'race/ethnicity', // 다음 페이지
  },
  {
    id: 'race/ethnicity',
    title: 'Race/Ethnicity?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Asian', value: 'Asian' },
      { label: 'Black', value: 'Black' },
      { label: 'White', value: 'White' },
      { label: 'Other', value: 'Other' },
    ],
    nextPage: 'hispanic/latino', // 다음 페이지
  },
  {
    id: 'hispanic/latino',
    title: 'Hispanic/Latino?',
    profile_img: IMAGES.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: null, // 마지막 페이지일 경우 nextPage를 null로 설정
  },
  // 더 많은 페이지 데이터를 여기에 추가할 수 있습니다.
];
