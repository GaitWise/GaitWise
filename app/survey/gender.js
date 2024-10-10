import * as React from "react";
import styled from "styled-components/native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, icons } from "../../constants";
import { useNavigation } from "expo-router";

const AGender = () => {
  const navigation = useNavigation();
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

  return (
    <GenderContainer onPress={() => {}}>
      <StatusBarContainer>
        <BackIcon onPress={() => {}} />
      </StatusBarContainer>
      <GenderContent>
        <TitleText>What’s Your Gender</TitleText>
        <GenderSelection>
          {/* 남 버튼 */}
          <GenderButton onPress={handleMaleSelect}>
            <MaleIconContainer selected={selectedMale}>
              <GenderIcon source={icons.male} />
            </MaleIconContainer>
            <GenderLabel>Male</GenderLabel>
          </GenderButton>
          {/* 여 버튼 */}
          <GenderButton onPress={handleFemaleSelect}>
            <FemaleIconContainer selected={selectedFemale}>
              <GenderIcon source={icons.female} />
            </FemaleIconContainer>
            <GenderLabel>Female</GenderLabel>
          </GenderButton>
        </GenderSelection>
        <ContinueButton
          disabled={selectedMale && selectedFemale}
          selected={selectedMale || selectedFemale}
          bothSelected={selectedMale && selectedFemale}
          onPress={() => navigation.navigate("age")}
          >
          <ContinueText>Continue</ContinueText>
        </ContinueButton>
      </GenderContent>
    </GenderContainer>
  );
};

export default AGender;

const GenderContainer = styled.Pressable`
  flex: 1;
  align-items: center;
  background-color: ${COLORS.white};
  height: 852px;
  border-width: 1px;
  border-color: ${COLORS.white};
  overflow: hidden;
`;

const StatusBarContainer = styled.View`
  margin-top: 51px;
  align-items: center;
  align-self: stretch;
`;

const BackIcon = styled.Pressable`
  padding-left: 24px;
  gap: 14px;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
`;

const GenderContent = styled.View`
  height: 739px;
  gap: 56px;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  font-family: "Poppins-Bold";
  font-weight: bold;
  text-align: left;
`;

const GenderSelection = styled.View`
  height: 450px;
  flex-direction: column;
  gap: 30px;
`;

const GenderButton = styled(TouchableOpacity)`
  align-items: center;
`;

const MaleIconContainer = styled.View`
  width: 163px;
  height: 163px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? COLORS.soft_blue : COLORS.continue_gray};
  border-radius: 100px;
`;

const FemaleIconContainer = styled.View`
  width: 163px;
  height: 163px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? COLORS.bright_pink : COLORS.continue_gray};
  border-radius: 100px;
`;

const GenderIcon = styled.Image`
  width: 100px;
  height: 100px;
`;

const GenderLabel = styled.Text`
  font-size: 20px;
  font-family: "Poppins-Bold";
  font-weight: 700;
  color: ${COLORS.black};
  margin-top: 10px;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: 179px;
  padding: 10px 36px;
  border-radius: 100px;
  background-color: ${(props) =>
    props.selected && !props.bothSelected
      ? COLORS.dark_indigo
      : COLORS.continue_gray};
  border-width: 1px;
  border-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
  font-family: "Poppins-Bold";
`;

