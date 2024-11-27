import { useState } from 'react';
import { router } from 'expo-router';
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* 화면 크기 가져오기 */
const { width, height } = Dimensions.get('window');

/* [Screen] Gender 화면 */
const Gender = () => {
  const [selectedMale, setSelectedMale] = useState(true);
  const [selectedFemale, setSelectedFemale] = useState(true);

  /* [Function] 남성 버튼 선택 */
  const handleMaleSelect = () => {
    setSelectedMale(true);
    setSelectedFemale(false);
  };

  /* [Function] 여성 버튼 선택 */
  const handleFemaleSelect = () => {
    setSelectedFemale(true);
    setSelectedMale(false);
  };

  /* [Function] Continue 버튼 동작 */
  const handleContinue = async () => {
    try {
      const gender = selectedMale ? 'Male' : selectedFemale ? 'Female' : null;

      if (!gender) {
        console.error('No gender selected');
        return;
      }

      // AsyncStorage에 성별 데이터 저장
      await AsyncStorage.setItem('genderData', JSON.stringify(gender));

      // 다음 페이지로 이동
      router.push('/survey/age');
    } catch (error) {
      console.error('Failed to save gender:', error);
    }
  };

  /* UI */
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

/* styled-components */
const GenderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.white};
`;

const GenderContent = styled.View`
  align-items: center;
  justify-content: space-between;
  height: ${height * 0.75}px;
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: ${width * 0.08}px;
  color: ${COLORS.dark_indigo};
  font-weight: bold;
  text-align: center;
`;

const GenderSelection = styled.View`
  gap: ${height * 0.03}px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GenderButton = styled(TouchableOpacity)`
  align-items: center;
`;

const MaleIconContainer = styled.View`
  width: ${width * 0.38}px;
  height: ${width * 0.38}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? COLORS.soft_blue : COLORS.continue_gray};
  border-radius: ${width * 0.2}px;
`;

const FemaleIconContainer = styled.View`
  width: ${width * 0.38}px;
  height: ${width * 0.38}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? COLORS.bright_pink : COLORS.continue_gray};
  border-radius: ${width * 0.2}px;
`;

const GenderLabel = styled.Text`
  font-size: ${width * 0.05}px;
  font-weight: 700;
  color: ${COLORS.black};
  margin-top: ${height * 0.01}px;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.6}px;
  height: ${height * 0.08}px;
  padding: ${height * 0.015}px;
  border-radius: ${width * 0.5}px;
  background-color: ${(props) =>
    props.selected && !props.bothSelected
      ? COLORS.dark_indigo
      : COLORS.continue_gray};
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  font-size: ${width * 0.05}px;
  color: ${COLORS.white};
  font-weight: bold;
`;
