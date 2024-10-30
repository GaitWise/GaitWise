import * as React from 'react';
import styled from 'styled-components/native';
import { useState, useRef } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { COLORS, icons } from '../../constants';
import { useNavigation } from 'expo-router';

const Age = () => {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(0);
  const flatListRef = useRef(null);

  const ageArray = Array.from({ length: 101 }, (_, index) => index);

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / 68);
    setSelectedAge(ageArray[newIndex]);
  };

  return (
    <BaseContainer>
      <FrameContainer>
        <HowOldAreYouContainer>
          <HowOldAreText>How Old Are You?</HowOldAreText>
        </HowOldAreYouContainer>
        <AgeText>{selectedAge}</AgeText>
        <ArrowIconContainer>
          <ArrowIcon source={icons.arrow_up} />
        </ArrowIconContainer>
          <AgeContainer>
            <FlatList
              horizontal
              ref={flatListRef}
              data={ageArray}
              keyExtractor={(item) => item.toString()}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScrollEnd}
              snapToInterval={25}
              snapToAlignment="center"
              decelerationRate="normal"
              scrollEnabled={true}
              contentContainerStyle={{ paddingHorizontal: 160 }}
              renderItem={({ item }) => (
                <AgeItem>
                  <StyledAgeText isSelected={item === selectedAge}>
                    {item}
                  </StyledAgeText>
                </AgeItem>
              )}
            />
          </AgeContainer>
        <ButtonContainer>
          <ContinueButton onPress={() => navigation.navigate('weight')}>
            <ContinueText>Continue</ContinueText>
          </ContinueButton>
        </ButtonContainer>
      </FrameContainer>
    </BaseContainer>
  );
};

export default Age;

const ButtonContainer = styled.View`
  padding: 30%;
  justify-content: center;
  align-items: center;
`;

const ArrowIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

const ArrowIcon = styled.Image`
  width: 46px;
  height: 32px;
`;

const AgeContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  width: 100%;
  height: 150px;
  align-items: center;
`;

const BaseContainer = styled.View`
  background-color: ${COLORS.white};
  flex: 1;
  height: 844px;
  overflow: hidden;
  width: 100%;
`;

const FrameContainer = styled.View`
  gap: 38px;
  align-items: center;
  flex: 1;
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
  font-size: 30px;
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
  width: 68px;
  justify-content: center;
  align-items: center;
`;

const StyledAgeText = styled.Text`
  font-size: ${(props) => (props.isSelected ? '45px' : '30px')};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-family: Poppins-Bold;
  font-weight: 700;
  justify-content: center;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: 179px;
  padding: 10px 36px;
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  border-width: 3px;
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
