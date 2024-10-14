// components/survey/surveytemplate.js
import * as React from 'react';
import { Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS, icons } from '../../constants';

const Surveytemplate = ({ currentPageData, onNextPage, onContinue }) => { // onContinue prop 추가
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleContinue = () => {
    if (selectedOption !== null || inputValue.trim() !== '') {
      onContinue(); // 부모 컴포넌트의 onContinue 호출
      setSelectedOption(null);
      setInputValue('');
    }
  };

  const optionsContainerHeight =
    currentPageData.options && currentPageData.options.length > 0
      ? Math.max(150, currentPageData.options.length * 90)
      : 392;

  return (
    <BaseFrameContainer>
      <TitleContainer>
        <TitleText>{currentPageData.title}</TitleText>
      </TitleContainer>
      <ProfileImage source={currentPageData.profile_img} resizeMode="cover" />
      <OptionsContainer height={optionsContainerHeight}>
        {currentPageData.options && currentPageData.options.length > 0 ? (
          currentPageData.options.map((option) => (
            <OptionButton
              key={option.value}
              isSelected={selectedOption === option.value}
              onPress={() => setSelectedOption(option.value)}
            >
              <CheckIcon
                resizeMode="cover"
                source={
                  selectedOption === option.value
                    ? icons.checked
                    : icons.check
                }
              />
              <OptionText>{option.label}</OptionText>
            </OptionButton>
          ))
        ) : (
          <InputContainer>
            <Input
              placeholder="Type your answer here..."
              value={inputValue}
              onChangeText={setInputValue}
            />
          </InputContainer>
        )}
      </OptionsContainer>
      <ContinueButton onPress={handleContinue}>
        <ContinueText>Continue</ContinueText>
      </ContinueButton>
    </BaseFrameContainer>
  );
};

export default Surveytemplate;

// styled-components
const BaseFrameContainer = styled.View`
  flex: 1;
  overflow: hidden;
  width: 100%;
  background-color: ${COLORS.white};
  align-items: center;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin: 30px auto;
`;

const TitleText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  font-family: 'Poppins-Bold';
  font-weight: 700;
  text-transform: capitalize;
  margin-left: 5px;
  text-align: center;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 50px;
  margin: 10px auto;
`;

const OptionsContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  height: ${({ height }) => height}px;
  justify-content: space-around;
  padding: 30px 0;
  align-self: stretch;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const OptionButton = styled(Pressable)`
  border-radius: 50px;
  height: 54px;
  padding: 10px 12px;
  width: 323px;
  background-color: ${COLORS.white};
  flex-direction: row;
  align-items: center; /* align-items를 center로 수정 */
  justify-content: center; /* justify-content를 center로 수정 */
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.7)};
  margin-bottom: 25px;
`;

const CheckIcon = styled.Image`
  width: 34px;
  height: 34px;
  margin-right: 20px;
`;

const OptionText = styled.Text`
  font-family: 'LeagueSpartan-Regular';
  color: #232323;
  width: 197px;
  height: 27px;
  line-height: 14px;
  text-align: left;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const ContinueButton = styled(Pressable)`
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  border: 1px solid ${COLORS.white};
  width: 179px;
  padding: 15px 36px;
  position: absolute;
  left: 50%;
  margin-left: -89.5px;
  bottom: 35px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ContinueText = styled.Text`
  color: #fff;
  font-family: 'Poppins-Bold';
  font-weight: 700;
  text-align: center;
`;

const InputContainer = styled.View`
  width: 80%;
  margin-bottom: 20px;
`;

const Input = styled(TextInput)`
  border-radius: 15px;
  background-color: #f1f2f6;
  border-color: #27187e;
  height: 248px;
  padding-horizontal: 20px;
  align-self: stretch;
`;

