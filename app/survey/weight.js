import { router } from 'expo-router';
import { useState, useRef } from 'react';
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 📌 Icon 라이브러리 추가

import {
  TouchableOpacity,
  FlatList,
  Alert, // 📌 Alert 추가
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Weight = () => {
  const flatListRef = useRef(null);
  const [selectedUnit, setSelectedUnit] = useState('KG');
  const [selectedWeight, setSelectedWeight] = useState(0);
  const weightArray = Array.from({ length: 201 }, (_, index) => index);

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (width * 0.18));
    setSelectedWeight(weightArray[newIndex]);
  };

  const toggleUnit = (unit) => {
    setSelectedUnit(unit);
  };

  const isFormValid = () => {
    return selectedWeight;
  };

  // 📌 입력받은 몸무게 값을 정확히 selectedWeight에 반영하는 함수
  const handleWeightInput = () => {
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
            const newWeight = parseInt(input, 10); // 입력값을 정수로 변환하여 저장
            if (!isNaN(newWeight) && newWeight >= 0 && newWeight <= 200) {
              setSelectedWeight(newWeight);

              // 📌 스크롤 위치를 newWeight와 일치하게 조정
              flatListRef.current.scrollToOffset({
                offset: newWeight * (width * 0.18),
                animated: true,
              });
            }
          },
        },
      ],
      'plain-text',
      selectedWeight.toString(),
    );
  };

  return (
    <BaseFrameContainer>
      <QContainer>
        <QText>What Is Your Weight?</QText>
      </QContainer>

      {/* KG, LB 바꾸는 곳 */}
      <KgContainer>
        <TouchableOpacity onPress={() => toggleUnit('KG')}>
          <UnitText isSelected={selectedUnit === 'KG'}>KG</UnitText>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => toggleUnit('LB')}>
          <UnitText isSelected={selectedUnit === 'LB'}>LB</UnitText>
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
        onPress={() => {
          if (isFormValid()) {
            router.push('/survey/height');
          }
        }}
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

// Styled Components
const WeightText = styled.Text`
  font-size: ${width * 0.1}px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-align: center;
`;

const StyledWeightText = styled.Text`
  font-size: ${(props) => (props.isSelected ? width * 0.08 : width * 0.05)}px;
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

const WeightItem = styled.View`
  width: ${width * 0.18}px;
  justify-content: center;
  align-items: center;
`;

const WeightContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  width: 100%;
  height: ${height * 0.18}px;
  align-items: center;
  margin-top: 20px;
`;

const BaseFrameContainer = styled.View`
  background-color: ${COLORS.white};
  flex: 1;
  align-items: center;
  gap: ${height * 0.02}px;
`;

const QContainer = styled.View`
  height: ${height * 0.18}px;
  justify-content: center;
  align-items: center;
`;

const QText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-size: ${width * 0.08}px;
  font-weight: 700;
`;

const KgContainer = styled.View`
  justify-content: space-between;
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  align-items: center;
  border-radius: ${width * 0.035}px;
  width: ${width * 0.85}px;
  padding-vertical: ${height * 0.01}px;
`;

const UnitText = styled.Text`
  width: ${width * 0.35}px;
  font-weight: 700;
  font-size: ${width * 0.05}px;
  text-align: center;
  color: ${(props) =>
    props.isSelected ? COLORS.dark_indigo : COLORS.light_mist_grey};
`;

const Divider = styled.View`
  width: ${width * 0.01}px;
  background-color: ${COLORS.light_mist_grey};
  height: ${height * 0.05}px;
`;

const ResultContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;
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
  margin-top: 20px;
`;

const ContinueButtonText = styled.Text`
  font-size: ${width * 0.045}px;
  color: ${COLORS.white};
  text-align: center;
  font-weight: 700;
`;
