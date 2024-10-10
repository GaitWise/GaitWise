import * as React from "react";
import { Pressable } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";
import { COLORS, icons } from "../../constants";
import { pagesData } from "../../app/survey/data";

const Main = () => {
  const [pageIndex, setPageIndex] = useState(0); // 현재 페이지 인덱스 상태 관리
  const [selectedOption, setSelectedOption] = useState(null);

  const currentPageData = pagesData[pageIndex]; // 현재 페이지 데이터 가져오기

  const handleContinue = () => {
    if (pageIndex < pagesData.length - 1) {
      setPageIndex(pageIndex + 1); // 다음 페이지로 이동
      setSelectedOption(null); // 선택 초기화
    }
  };
  const optionsContainerHeight = 465 - (currentPageData.options.length - 2) * 40;

  return (
    <BaseFrameContainer>
      <TitleContainer>
        <TitleText>{currentPageData.title}</TitleText>
      </TitleContainer>
      <ProfileImage source={currentPageData.profile_img} resizeMode="cover" />
      <OptionsContainer>
        {currentPageData.options.map((option) => (
          <OptionButton
            key={option.value}
            isSelected={selectedOption === option.value}
            onPress={() => setSelectedOption(option.value)} // 선택된 옵션 설정
          >
            <CheckIcon
              resizeMode="cover"
              source={
                selectedOption === option.value
                  ? icons.checked // 선택된 경우
                  : icons.check // 선택되지 않은 경우
              }
            />
            <OptionText>{option.label}</OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>
      <ContinueButton onPress={handleContinue}>
        <ContinueText>Continue</ContinueText>
      </ContinueButton>
    </BaseFrameContainer>
  );
};

// styled-components
const BaseFrameContainer = styled.View`
  flex: 1;
  overflow: hidden;
  width: 100%;
  background-color: ${COLORS.white};
    align-items: center; /* 수평 중앙 정렬 */
`;

const TitleContainer = styled.View`
  align-items: center; /* 수평 중앙 정렬 */
  margin: 30px auto;

`;

const TitleText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  font-family: "Poppins-Bold";
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
  padding: 40px 0;
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
  align-items: bottom;
  justify-content: bottom;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.7)};
  margin-bottom: 25px;
`;

const CheckIcon = styled.Image`
  width: 34px;
  height: 34px;
  margin-right: 20px;
`;

const OptionText = styled.Text`
  font-family: "LeagueSpartan-Regular";
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
  
`;

const ContinueText = styled.Text`
  color: #fff;
  font-family: "Poppins-Bold";
  font-weight: 700;
  text-align: center;
`;

export default Main;
