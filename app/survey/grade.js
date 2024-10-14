import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import Surveytemplate from '../../components/survey/Surveytemplate'; // 고정된 Grade 컴포넌트
import { icons } from '../../constants'; // 아이콘을 가져옵니다.

const Grade = () => {
  const [currentPageId, setCurrentPageId] = useState('grade'); // 초기 페이지 ID는 'grade'

  // 현재 페이지 데이터 가져오기
  const currentPageData = pagesData.find((page) => page.id === currentPageId);

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPageData.nextPage) {
      setCurrentPageId(currentPageData.nextPage); // 다음 페이지로 변경
    } else {
      console.log('마지막 페이지입니다.');
    }
  };

  return (
    <BaseFrameContainer>
      {/* Grade 컴포넌트에 현재 페이지 데이터와 다음 페이지로 넘어가는 함수 전달 */}
      <Surveytemplate pagesData={currentPageData} onNextPage={goToNextPage} />
    </BaseFrameContainer>
  );
};

// styled-components
const BaseFrameContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
export default Grade;

const pagesData = [
  {
    id: 'grade',
    title: 'What Is Your Grade?',
    profile_img: icons.profile,
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
    profile_img: icons.profile,
    options: [], // 옵션이 없는 페이지
    nextPage: 'health', // 다음 페이지
  },
  {
    id: 'health',
    title: 'How Would You Describe Your Current State Of Health?',
    profile_img: icons.profile,
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
    profile_img: icons.profile,
    options: [], // 옵션이 없는 페이지
    nextPage: 'pain', // 다음 페이지
  },
  {
    id: 'pain',
    title: 'Do You Experience Any Kind Of Pain?',
    profile_img: icons.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'walking', // 다음 페이지
  },
  {
    id: 'walking',
    title: 'Have You Had Any Problems Walking?',
    profile_img: icons.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'concussion', // 다음 페이지
  },
  {
    id: 'concussion',
    title: 'Have You Ever Had A Concussion?',
    profile_img: icons.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'condition', // 다음 페이지
  },
  {
    id: 'condition',
    title:
      'Do You Want To Share Anythin Else About Your Health Or Condition Today?',
    profile_img: icons.profile,
    options: [], // 옵션이 없는 페이지
    nextPage: 'race/ethnicity', // 다음 페이지
  },
  {
    id: 'race/ethnicity',
    title: 'Race/Ethnicity?',
    profile_img: icons.profile,
    options: [
      { label: 'Asian', value: 'Asian' },
      { label: 'Black', value: 'Black' },
      { label: 'white', value: 'white' },
      { label: 'Other', value: 'Other' },
    ],
    nextPage: 'hispanic/latino', // 다음 페이지
  },
  {
    id: 'hispanic/latino',
    title: 'Hispanic/Latino?',
    profile_img: icons.profile,
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
    nextPage: 'age', // 다음 페이지
  },
  // 더 많은 페이지 데이터를 여기에 추가할 수 있습니다.
];
