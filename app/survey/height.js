import { COLORS } from '@/constants';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
import { TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BaseContainer,
  FrameContainer,
  QuestionContainer,
  QuestionText,
  HeightTextContainer,
  HeightText,
  HeightScrollContainer,
  HeightItem,
  StyledHeightText,
  ContinueButton,
  ContinueButtonText,
} from '@/components/survey/styles/height.styles';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.0579; // 📌 스크롤 아이템의 높이를 상수로 지정

const Height = () => {
  const flatListRef = useRef(null);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const heightArray = Array.from({ length: 251 }, (_, index) => index);

  // 스크롤 조정
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedHeight(heightArray[newIndex]);
  };

  const isFormValid = () => {
    return selectedHeight;
  };

  // 📌 입력 창을 표시해 신장 값을 입력받고 selectedHeight와 스크롤 위치를 업데이트하는 함수
  const handleHeightInput = () => {
    Alert.prompt(
      'Enter Your Height',
      'Please enter your height in cm',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (input) => {
            const newHeight = parseInt(input);
            if (!isNaN(newHeight) && newHeight >= 0 && newHeight <= 250) {
              setSelectedHeight(newHeight);

              // 정확한 위치로 스크롤하기 위해 데이터 배열 인덱스를 기반으로 오프셋 조정
              const targetIndex = heightArray.indexOf(newHeight);
              if (targetIndex !== -1) {
                flatListRef.current.scrollToIndex({
                  index: targetIndex,
                  animated: true,
                });
              }
            }
          },
        },
      ],
      'plain-text',
      selectedHeight.toString(),
    );
  };
  const handleContinue = async () => {
    try {
      // 📌 AsyncStorage에서 모든 데이터 읽어오기
      const age = await AsyncStorage.getItem('selectedAge');
      const weight = await AsyncStorage.getItem('selectedWeight');
      const gender = await AsyncStorage.getItem('genderData');
      const profile = await AsyncStorage.getItem('input');
      // 필요한 데이터 더 추가

      const allData = {
        profile: JSON.parse(profile),
        gender: JSON.parse(gender),
        age: JSON.parse(age),
        weight: JSON.parse(weight),
        height: selectedHeight, // 현재 페이지 데이터
      };

      // 📌 한꺼번에 저장
      await AsyncStorage.setItem('finalData', JSON.stringify(allData));

      console.log('All data saved:', allData);
      router.push('/project_select');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <BaseContainer>
      <FrameContainer>
        {/* Question Section */}
        <QuestionContainer>
          <QuestionText>What Is Your Height?</QuestionText>
        </QuestionContainer>

        {/* 📌 selectedHeight를 표시하고 클릭 시 handleHeightInput 호출 */}
        <TouchableOpacity onPress={handleHeightInput}>
          <HeightTextContainer>
            <HeightText>{selectedHeight}cm</HeightText>
            <Icon name="edit" size={height * 0.03} color={COLORS.dark_indigo} />
          </HeightTextContainer>
        </TouchableOpacity>

        {/* Height Scroll Section */}
        <HeightScrollContainer>
          <FlatList
            ref={flatListRef}
            data={heightArray}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            snapToAlignment="start"
            decelerationRate="fast"
            scrollEnabled={true}
            renderItem={({ item }) => (
              <HeightItem>
                <StyledHeightText isSelected={item === selectedHeight}>
                  {item}
                </StyledHeightText>
              </HeightItem>
            )}
            snapToInterval={ITEM_HEIGHT}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            contentContainerStyle={{
              paddingVertical: (height * 0.4 - ITEM_HEIGHT) / 2, // 📌 중앙에 숫자를 위치시키기 위한 패딩
            }}
            initialNumToRender={251} // 모든 항목을 렌더링
          />
        </HeightScrollContainer>

        {/* Continue Button */}
        <ContinueButton
          onPress={() => {
            if (isFormValid()) {
              handleContinue();
            }
          }}
          disabled={!isFormValid()}
          isFormValid={isFormValid()}
          activeOpacity={0.7}
        >
          <ContinueButtonText>Continue</ContinueButtonText>
        </ContinueButton>
      </FrameContainer>
    </BaseContainer>
  );
};

export default Height;
