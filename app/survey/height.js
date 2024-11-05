import * as React from 'react';
import styled from 'styled-components/native';
import { useState, useRef } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '@/constants';
import { router } from 'expo-router';

const Height = () => {
  const [selectedHeight, setSelectedHeight] = useState(50);
  const flatListRef = useRef(null);

  const heightArray = Array.from({ length: 251 }, (_, index) => index);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / 50);
    setSelectedHeight(heightArray[newIndex]);
  };

  return (
    <BaseContainer>
      <FrameContainer>
        <QuestionContainer>
          <HeightText>What Is Your Height?</HeightText>
        </QuestionContainer>
        {/* 선택된 키 나오는 곳 */}
        <QuestionText>{selectedHeight}cm</QuestionText>
        {/* 키 스크롤 하는 곳 */}
        <HeightContainer>
          <FlatList
            ref={flatListRef}
            data={heightArray}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            snapToInterval={50}
            decelerationRate="fast"
            contentContainerStyle={{ paddingVertical: 100 }}
            renderItem={({ item }) => (
              <HeightItem>
                <StyledHeightText isSelected={item === selectedHeight}>
                  {item}
                </StyledHeightText>
              </HeightItem>
            )}
          />
        </HeightContainer>
        {/* continue 버튼 */}
        <ContinueButton onPress={() => router.push('/project_select')}>
          <ContinueText>Continue</ContinueText>
        </ContinueButton>
      </FrameContainer>
    </BaseContainer>
  );
};

export default Height;

// 스타일 컴포넌트들

const HeightContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  justify-content: center;
  align-items: center;
  height: 371px;
  width: 115px;
  border-radius: 10px;
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

const QuestionContainer = styled.View`
  height: 167px;
  padding-vertical: 50px;
  gap: 35px;
  z-index: 0;
  justify-content: center;
  align-items: center;
`;

const HeightText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-transform: capitalize;
  font-size: 25px;
  text-align: left;
`;

const QuestionText = styled.Text`
  font-size: 64px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-align: center;
`;

const HeightItem = styled.View`
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const StyledHeightText = styled.Text`
  font-size: ${(props) => (props.isSelected ? '35px' : '25px')};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
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
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;
