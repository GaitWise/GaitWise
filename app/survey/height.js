import { COLORS } from '@/constants';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Height = () => {
  const flatListRef = useRef(null);
  const [selectedHeight, setSelectedHeight] = useState(50);
  const heightArray = Array.from({ length: 251 }, (_, index) => index);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / 50);
    setSelectedHeight(heightArray[newIndex]);
  };

  const navigateToNext = () => {
    router.push('/project_select');
  };

  return (
    <BaseContainer>
      <FrameContainer>
        
        {/* Question Section */}
        <QuestionContainer>
          <QuestionText>What Is Your Height?</QuestionText>
        </QuestionContainer>

        {/* Selected Height Display */}
        <HeightText>{selectedHeight}cm</HeightText>

        {/* Height Scroll Section */}
        <HeightScrollContainer>
          <FlatList
            ref={flatListRef}
            data={heightArray}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            decelerationRate="fast"
            contentContainerStyle={{ paddingVertical: height * 0.5 }}
            renderItem={({ item }) => (
              <HeightItem>
                <StyledHeightText isSelected={item === selectedHeight}>
                  {item}
                </StyledHeightText>
              </HeightItem>
            )}
          />
        </HeightScrollContainer>

        {/* Continue Button */}
        <ContinueButton onPress={navigateToNext}>
          <ContinueButtonText>Continue</ContinueButtonText>
        </ContinueButton>

      </FrameContainer>
    </BaseContainer>
  );
};

export default Height;

// Styled Components

const BaseContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  width: 100%;
  height: 100%;
`;

const FrameContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${height * 0.08}px;
  gap: ${height * 0.03}px;
`;

const QuestionContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: ${height * 0.02}px;
`;

const QuestionText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-size: ${height * 0.04}px;
  font-weight: 700;
`;

const HeightText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  font-size: ${height * 0.05}px;
`;

const HeightScrollContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  align-items: center;
  justify-content: center;
  width: ${width * 0.3}px;
  height: ${height * 0.4}px;
  border-radius: 10px;
`;

const HeightItem = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const StyledHeightText = styled.Text`
  font-size: ${(props) => (props.isSelected ? `${height * 0.04}px` : `${height * 0.03}px`)};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.5}px;
  height: ${height * 0.08}px;
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  justify-content: center;
  align-items: center;
  margin-top: ${height * 0.03}px;
`;

const ContinueButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: ${height * 0.025}px;
  font-weight: 700;
  text-align: center;
`;
