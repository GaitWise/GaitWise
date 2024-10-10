// data.js
import { icons } from '../../constants'; // 아이콘을 가져옵니다.

export const pagesData = [
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
