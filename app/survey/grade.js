import * as React from "react";
import { Pressable } from "react-native";
import { useState } from "react";
import styled from "styled-components/native"; // styled-components import
import { useNavigation } from "@react-navigation/native"; // useNavigation 훅을 import
import { COLORS, icons } from "../../constants";

const Grade = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const navigation = useNavigation(); // navigation 객체 생성

  // JSON 데이터
  const data = {
    title: "What Is Your Grade?",
    profile_img: icons.profile, // 수정된 프로필 이미지 참조
    options: [
      { label: "Freshman", value: "Freshman" },
      { label: "Sophomore", value: "Sophomore" },
      { label: "Junior", value: "Junior" },
      { label: "Senior", value: "Senior" },
      { label: "Other", value: "Other" },
    ],
  };

  return (
    <BaseFrameContainer>
      <TitleContainer>
        <TitleText>{data.title}</TitleText>
      </TitleContainer>
      <ProfileImage source={data.profile_img} resizeMode="cover" />
      <OptionsContainer>
        {data.options.map((option) => (
          <OptionButton
            key={option.value}
            isSelected={selectedGrade === option.value}
            onPress={() => setSelectedGrade(option.value)} // 선택된 학년 설정
          >
            <CheckIcon
              resizeMode="cover"
              source={
                selectedGrade === option.value
                  ? icons.checked // 선택된 경우
                  : icons.check // 선택되지 않은 경우
              }
            />
            <OptionText>{option.label}</OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>
      <ContinueButton onPress={() => navigation.navigate("age")}>
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
`;

const TitleContainer = styled.View`
  padding: 30px 0;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  font-family: "Poppins-Bold";
  font-weight: 700;
  text-transform: capitalize;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 50px;
  margin: 10px auto;
`;

const OptionsContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  height: 465px;
  justify-content: space-between;
  padding: 40px 0;
  align-self: stretch;
  align-items: center;
`;

const OptionButton = styled(Pressable)`
  border-radius: 50px;
  height: 54px;
  padding: 10px 12px;
  width: 323px;
  background-color: ${COLORS.white};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.7)};
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
`;

const ContinueButton = styled(Pressable)`
  border-radius: 100px;
  background-color: #27187e;
  border: 1px solid #fff;
  width: 179px;
  padding: 10px 36px;
  position: absolute;
  left: 50%;
  margin-left: -89.5px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  color: #fff;
  font-family: "Poppins-Bold";
  font-weight: 700;
  text-align: center;
`;

export default Grade;
