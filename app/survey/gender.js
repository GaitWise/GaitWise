import { useState } from 'react';
import { router } from 'expo-router';
import { icons } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GenderContainer,
  GenderContent,
  TitleText,
  GenderSelection,
  GenderButton,
  MaleIconContainer,
  FemaleIconContainer,
  GenderLabel,
  ContinueButton,
  ContinueText,
} from '@/components/survey/styles/gender.styles';

const Gender = () => {
  const [selectedMale, setSelectedMale] = useState(true);
  const [selectedFemale, setSelectedFemale] = useState(true);

  const handleMaleSelect = () => {
    setSelectedMale(true);
    setSelectedFemale(false);
  };

  const handleFemaleSelect = () => {
    setSelectedFemale(true);
    setSelectedMale(false);
  };

  const handleContinue = async () => {
    try {
      const gender = selectedMale ? 'Male' : selectedFemale ? 'Female' : null;

      if (!gender) {
        console.error('No gender selected');
        return;
      }

      console.log('Gender to save:', gender); // 디버깅용 로그

      // AsyncStorage에 저장
      await AsyncStorage.setItem('genderData', JSON.stringify(gender));

      // 다음 페이지로 이동
      router.push('/survey/age');
    } catch (error) {
      console.error('Failed to save gender:', error);
    }
  };

  return (
    <GenderContainer>
      <GenderContent>
        <TitleText>What’s Your Gender?</TitleText>
        <GenderSelection>
          {/* 남 버튼 */}
          <GenderButton onPress={handleMaleSelect}>
            <MaleIconContainer selected={selectedMale}>
              <icons.male />
            </MaleIconContainer>
            <GenderLabel>Male</GenderLabel>
          </GenderButton>

          {/* 여 버튼 */}
          <GenderButton onPress={handleFemaleSelect}>
            <FemaleIconContainer selected={selectedFemale}>
              <icons.female />
            </FemaleIconContainer>
            <GenderLabel>Female</GenderLabel>
          </GenderButton>
        </GenderSelection>

        {/* continue 버튼 */}
        <ContinueButton
          disabled={selectedMale && selectedFemale}
          selected={selectedMale || selectedFemale}
          bothSelected={selectedMale && selectedFemale}
          onPress={handleContinue}
        >
          <ContinueText>Continue</ContinueText>
        </ContinueButton>
      </GenderContent>
    </GenderContainer>
  );
};

export default Gender;
