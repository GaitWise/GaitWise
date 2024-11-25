import { router } from 'expo-router';
import { useState, useRef } from 'react';
import { COLORS, icons } from '@/constants';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 📌 Icon 라이브러리 추가
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TouchableOpacity,
  FlatList,
  Alert, // 📌 Alert 추가
  Dimensions,
} from 'react-native';
import {
  WeightText,
  StyledWeightText,
  WeightItem,
  WeightContainer,
  BaseFrameContainer,
  QContainer,
  QText,
  KgContainer,
  UnitText,
  Divider,
  ResultContainer,
  ContinueButton,
  ContinueButtonText,
} from '../../components/survey/styles/weight.styles';

const { width, height } = Dimensions.get('window');
const ITEM_WEIGHT = width * 0.18;

const Weight = () => {
  const flatListRef = useRef(null);
  const [selectedKG, setSelectedKG] = useState('KG');
  const [selectedLB, setSelectedLB] = useState('LB');
  const [selectedWeight, setSelectedWeight] = useState(0);
  const weightArray = Array.from({ length: 201 }, (_, index) => index);

  const selectedUnit = selectedKG === 'KG' ? 'kg' : 'lb'; // 현재 선택된 단위

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / ITEM_WEIGHT);
    setSelectedWeight(weightArray[newIndex]);
  };

  const toggleUnit = (unit) => {
    setSelectedKG(unit);
    setSelectedLB(unit);
  };

  const isFormValid = () => {
    return selectedWeight;
  };

  // 📌 입력받은 몸무게 값을 정확히 selectedWeight에 반영하는 함수
  const handleWeightInput = async () => {
    Alert.prompt(
      'Enter Your Weight',
      'Please enter your weight',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (input) => {
            const newWeight = parseInt(input); // 입력값을 정수로 변환하여 저장
            if (!isNaN(newWeight) && newWeight >= 0 && newWeight <= 200) {
              setSelectedWeight(newWeight);

              // 📌 스크롤 위치를 newWeight와 일치하게 조정
              const targetIndex = weightArray.indexOf(newWeight);
              if (targetIndex !== -2) {
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
      selectedWeight.toString(),
    );
  };

  const handleContinue = async () => {
    try {
      const weightData = {
        value: selectedWeight,
        type: selectedUnit, // 선택된 단위 추가
      };

      await AsyncStorage.setItem('selectedWeight', JSON.stringify(weightData));
      router.push('/survey/height');
    } catch (error) {
      console.error('Failed to save weight:', error);
    }
  };

  return (
    <BaseFrameContainer>
    {/* Title */}
      <QContainer>
        <QText>What Is Your Weight?</QText>
      </QContainer>

      {/* KG, LB 바꾸는 곳 */}
      <KgContainer>
        <TouchableOpacity onPress={() => toggleUnit('KG')}>
          <UnitText isSelected={selectedKG === 'KG'}>KG</UnitText>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => toggleUnit('LB')}>
          <UnitText isSelected={selectedLB === 'LB'}>LB</UnitText>
        </TouchableOpacity>
      </KgContainer>

      {/* 몸무게 스크롤 */}
      <WeightContainer>
        <FlatList
          horizontal
          ref={flatListRef}
          data={weightArray}
          keyExtractor={(item) => item.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScrollEnd}
          snapToAlignment="center"
          decelerationRate="normal"
          scrollEnabled={true}
          contentContainerStyle={{ paddingHorizontal: width * 0.4 }}
          getItemLayout={(data, index) => ({
            length: ITEM_WEIGHT,
            offset: ITEM_WEIGHT * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          renderItem={({ item }) => (
            <WeightItem>
              <StyledWeightText isSelected={item === selectedWeight}>
                {item}
              </StyledWeightText>
            </WeightItem>
          )}
        />
      </WeightContainer>

      <icons.arrow_up />

      {/* 📌 몸무게를 표시하고 터치 시 handleWeightInput 호출 */}
      <TouchableOpacity onPress={handleWeightInput}>
        <ResultContainer>
          <WeightText>
            {selectedWeight} {selectedUnit} {/* 선택한 단위 표시 */}
            <Icon name="edit" size={height * 0.03} color={COLORS.dark_indigo} />
          </WeightText>
        </ResultContainer>
      </TouchableOpacity>

      {/* continue 버튼 */}
      <ContinueButton
        onPress={handleContinue}
        disabled={!isFormValid()}
        isFormValid={isFormValid()}
        activeOpacity={0.7}
      >
        <ContinueButtonText>Continue</ContinueButtonText>
      </ContinueButton>
    </BaseFrameContainer>
  );
};

export default Weight;
