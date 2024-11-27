import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS, IMAGES, icons } from '@/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Image,
  Pressable,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SurveyTemplate = ({ currentPageData, onContinue, onAnswer }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState([]);

  console.log("currentPageData.type 값:", currentPageData.type);
  console.log(currentPageData.max) 
  

  const handleOptionSelect = (optionValue) => {
    if (currentPageData.type === 'single-choice') {
      setSelectedOption([optionValue]);
    } else if (currentPageData.type === 'multi-choice') {
      setSelectedOption((prevSelected) => {
        if (prevSelected.includes(optionValue)) {
          return prevSelected.filter((value) => value !== optionValue);
        } else if (
          currentPageData.max &&
          prevSelected.length < currentPageData.max
        ) {
          return [...prevSelected, optionValue];
        } else if (!currentPageData.max) {
          return [...prevSelected, optionValue];
        } else {
          return prevSelected;
        }
      });
    }
  };

  const handleContinue = () => {
    const answer = selectedOption.length ? selectedOption : inputValue.trim();
    if (answer.length) {
      onAnswer(answer); // 답변 저장
      onContinue();
      setInputValue('');
      setSelectedOption([]);
    }
  };

  const optionsContainerHeight = currentPageData.options?.length
    ? Math.min(Math.max(150, currentPageData.options.length * 90), height * 0.6)
    : height * 0.4;

  const isContinueEnabled =
    selectedOption.length > 0 || inputValue.trim() !== '';
  const continueButtonColor = isContinueEnabled
    ? COLORS.dark_indigo
    : COLORS.continue_gray;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true} // Android에서도 동작하도록 설정
      keyboardShouldPersistTaps="handled" // 키보드가 열린 상태에서도 버튼을 누를 수 있도록 설정
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <BaseFrameContainer>
          <TitleContainer>
            <TitleText>{currentPageData.title}</TitleText>
          </TitleContainer>

        <ProfileImage source={IMAGES.profile} />

        <OptionsContainer height={optionsContainerHeight}>
            {currentPageData.options?.length ? (
              currentPageData.options.map((option) => (
                <OptionButton
                  key={option} // 문자열을 키로 사용
                  isSelected={selectedOption.includes(option)}
                  onPress={() => handleOptionSelect(option)}
                >
                  <IconWithMargin>
                    {selectedOption.includes(option) ? (
                      <icons.checked />
                    ) : (
                      <icons.check />
                    )}
                  </IconWithMargin>
                  <OptionText>{option}</OptionText> 
                </OptionButton>
              ))
            ) : (
              <InputContainer>
                <StyledInput
                  placeholder="ex : good"
                  placeholderTextColor={COLORS.pastel_lavender}
                  value={inputValue}
                  onChangeText={setInputValue}
                  multiline
                  numberOfLines={4}
                />
              </InputContainer>
            )}
          </OptionsContainer>
          <ContinueButton
            onPress={handleContinue}
            disabled={!isContinueEnabled}
            color={continueButtonColor}
          >
            <ContinueText>Continue</ContinueText>
          </ContinueButton>
        </BaseFrameContainer>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SurveyTemplate;

// styled-components
const BaseFrameContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.white};
  align-items: center;
  padding-top: 20px;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin: 45px auto;
`;

const TitleText = styled.Text`
  font-size: ${width * 0.06}px;
  color: ${COLORS.dark_indigo};
  font-family: 'Poppins-Bold';
  font-weight: 700;
  text-align: center;
`;

const OptionsContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  height: ${({ height }) => height}px; /* 동적 높이 적용 */
  justify-content: space-around;
  padding: 30px 0;
  width: 100%;
  align-items: center;
  margin: 20px;
  gap: 15px;
`;

const OptionButton = styled(Pressable)`
  border-radius: 50px;
  height: 50px;
  width: 90%;
  background-color: ${COLORS.white};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 15px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  elevation: 3;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${COLORS.dark_indigo}` : '2px solid transparent'};
`;

const IconWithMargin = styled.View`
  margin-right: 30px;
`;

const OptionText = styled.Text`
  font-family: 'LeagueSpartan-Regular';
  color: #232323;
  font-size: ${width * 0.045}px;
  font-weight: 700;
`;

const ContinueButton = styled(TouchableOpacity)`
  border-radius: ${width * 0.25}px;
  width: ${width * 0.5}px;
  padding: 12px;
  position: absolute;
  bottom: 35px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: ${({ color }) => color};
`;

const ContinueText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Bold';
  font-weight: 700;
  font-size: ${width * 0.04}px;
`;

const InputContainer = styled.View`
  width: 90%;
  margin-bottom: 20px;
`;

const StyledInput = styled(TextInput)`
  font-size: ${width * 0.045}px;
  border-radius: 15px;
  background-color: #f1f2f6;
  height: ${height * 0.25}px;
  padding: 15px;
  border: 1px solid ${COLORS.dark_indigo};
  color: #000;
  text-align-vertical: top;
`;
