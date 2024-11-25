import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 추가
import { icons } from '@/constants';
import { FlatList, Dimensions } from 'react-native';
import {
  BaseContainer,
  FrameContainer,
  TitleContainer,
  ContentContainer,
  HowOldAreYouContainer,
  HowOldAreText,
  AgeText,
  ArrowIconContainer,
  ArrowIcon,
  AgeContainer,
  AgeItem,
  StyledAgeText,
  ButtonContainer,
  ContinueButton,
  ContinueText,
} from '../../components/survey/styles/age.styles';

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
