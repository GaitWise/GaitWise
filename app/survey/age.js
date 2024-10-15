import * as React from "react";
import styled from "styled-components/native";
import { useState, useRef } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { COLORS } from "../../constants";
import { useNavigation } from "expo-router";

const Age = () => {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(0);
  const flatListRef = useRef(null);

  const ageArray = Array.from({ length: 101 }, (_, index) => index);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / 50); // 수정된 부분
    setSelectedAge(ageArray[newIndex]);
  };

  const scrollToAge = (age) => {
    flatListRef.current?.scrollToOffset({ offset: age * 50, animated: true });
  };

  return (
    <BaseContainer>
      <FrameContainer>
        <HowOldAreYouContainer>
          <HowOldAreText>How Old Are You?</HowOldAreText>
        </HowOldAreYouContainer>
        <AgeText>{selectedAge}</AgeText>
        <AgeContainer>
          <FlatList
            horizontal
            ref={flatListRef} // 수정된 부분
            data={ageArray}
            keyExtractor={(item) => item.toString()}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            snapToInterval={50}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 100 }}
            renderItem={({ item }) => (
              <AgeItem>
                <StyledAgeText isSelected={item === selectedAge}>
                  {item}
                </StyledAgeText>
              </AgeItem>
            )}
          />
        </AgeContainer>
        <ContinueButton onPress={() => navigation.navigate("weight")}>
          <ContinueText>Continue</ContinueText>
        </ContinueButton>
      </FrameContainer>
    </BaseContainer>
  );
};

export default Age;

const AgeContainer = styled.View`
  flex-direction: row;
`;

const BaseContainer = styled.View`
  background-color: ${COLORS.white};
  flex: 1;
  height: 844px;
  overflow: hidden;
  width: 100%;
`;

const FrameContainer = styled.View`
  height: 680px;
  gap: 38px;
  align-items: center;
`;

const HowOldAreYouContainer = styled.View`
  height: 167px;
  padding-vertical: 50px;
  gap: 35px;
  z-index: 0;
  justify-content: center;
  align-items: center;
`;

const HowOldAreText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-family: Poppins-Bold;
  font-weight: 700;
  text-transform: capitalize;
  font-size: 25px;
  text-align: left;
`;

const AgeText = styled.Text`
  font-size: 64px;
  color: ${COLORS.dark_indigo};
  font-family: Poppins-Bold;
  font-weight: 700;
  text-align: center;
`;

const AgeItem = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const StyledAgeText = styled.Text`
  font-size: ${(props) => (props.isSelected ? "35px" : "25px")};
  opacity: ${(props) => (props.isSelected ? "1" : "0.5")};
  color: ${COLORS.dark_indigo};
  font-family: Poppins-Bold;
  font-weight: 700;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: 179px;
  padding: 10px 36px;
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  border-width: 1px;
  border-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
  font-family: Poppins-Bold;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;
