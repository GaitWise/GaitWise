import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 추가
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import { TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Age = () => {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [selectedAge, setSelectedAge] = useState(0);
  const ageArray = Array.from({ length: 101 }, (_, index) => index);

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (width * 0.15));
    setSelectedAge(ageArray[newIndex]);
  };

  const isFormValid = () => {
    return selectedAge;
  };

  const handleContinue = async () => {
    try {
      // 📌 AsyncStorage에 선택한 나이를 저장
      await AsyncStorage.setItem('selectedAge', JSON.stringify(selectedAge));
      router.push('/survey/weight'); // 다음 페이지로 이동
    } catch (error) {
      console.error('Failed to save age:', error);
    }
  };

  return (
    <BaseContainer>
      <FrameContainer>
        <TitleContainer>
          <HowOldAreYouContainer>
            <HowOldAreText>How Old Are You?</HowOldAreText>
          </HowOldAreYouContainer>
        </TitleContainer>

        <ContentContainer>
          <AgeText>{selectedAge}</AgeText>

          <ArrowIconContainer>
            <icons.arrow_up />
          </ArrowIconContainer>

          <AgeContainer>
            <FlatList
              horizontal
              ref={flatListRef}
              data={ageArray}
              keyExtractor={(item) => item.toString()}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScrollEnd}
              snapToAlignment="center"
              decelerationRate="normal"
              scrollEnabled={true}
              contentContainerStyle={{ paddingHorizontal: width * 0.4 }}
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
            <ContinueButton
              onPress={handleContinue} // 변경된 함수 호출
              disabled={!isFormValid()}
              isFormValid={isFormValid()}
              activeOpacity={0.7}
            >
              <ContinueText>Continue</ContinueText>
            </ContinueButton>
          </ButtonContainer>
        </ContentContainer>
      </FrameContainer>
    </BaseContainer>
  );
};

export default Age;

const BaseContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  width: 100%;
  height: ${height}px;
`;

const FrameContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.View`
  margin-bottom: ${height *
  0.05}px; /* 상단 텍스트와 나머지 요소 사이 간격 조정 */
`;

const ContentContainer = styled.View`
  align-items: center;
  gap: ${height * 0.04}px;
  width: 100%;
`;

const HowOldAreYouContainer = styled.View`
  align-items: center;
`;

const HowOldAreText = styled.Text`
  font-size: ${width * 0.08}px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;

const AgeText = styled.Text`
  font-size: ${width * 0.15}px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-align: center;
`;

const ArrowIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${height * 0.01}px;
`;

const ArrowIcon = styled.Image`
  width: ${width * 0.1}px;
  height: ${width * 0.06}px;
`;

const AgeContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  width: 100%;
  height: ${height * 0.15}px;
  align-items: center;
`;

const AgeItem = styled.View`
  width: ${width * 0.15}px;
  justify-content: center;
  align-items: center;
`;

const StyledAgeText = styled.Text`
  font-size: ${(props) => (props.isSelected ? width * 0.1 : width * 0.07)}px;
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

const ButtonContainer = styled.View`
  margin-top: ${height * 0.04}px;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.6}px;
  height: ${height * 0.08}px;
  padding: ${height * 0.015}px;
  border-radius: ${width * 0.5}px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  font-size: ${width * 0.045}px;
  color: ${COLORS.white};
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;
