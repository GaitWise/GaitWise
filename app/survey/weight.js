import { router } from 'expo-router';
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, FlatList, Dimensions, TextInput, Modal} from 'react-native';


/* 화면 크기 가져오기 */
const { width, height } = Dimensions.get('window');
const ITEM_WEIGHT = width * 0.18;

/* [Screen] Weight 화면 */
const Weight = () => {
  const flatListRef = useRef(null);
  const [selectedKG, setSelectedKG] = useState('KG');
  const [selectedLB, setSelectedLB] = useState('LB');
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputWeight, setInputWeight] = useState(selectedWeight);
  const weightArray = Array.from({ length: 201 }, (_, index) => index);

  const selectedUnit = selectedKG === 'KG' ? 'kg' : 'lb'; 

  /* [Function] 스크롤 종료 시 몸무게 선택 함수 */
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / ITEM_WEIGHT);
    setSelectedWeight(weightArray[newIndex]);
  };

  /* [Function] 단위 변경 (KG/LB) 함수 */
  const toggleUnit = (unit) => {
    setSelectedKG(unit);
    setSelectedLB(unit);
  };

  /* [Function] Form 유효성 검사 함수 */
  const isFormValid = () => {
    return selectedWeight;
  };
  
  /* 모달 열기 */
  handleWeightInput = () => {
    setModalVisible(true);
  };

  /* [Function] 입력된 몸무게 확인 및 적용 함수 */
  const handleConfirmWeight = async () => {
    const newWeight = parseInt(inputWeight); 
    if (!isNaN(newWeight) && newWeight >= 0 && newWeight <= 200) {
      setSelectedWeight(newWeight);

      // 스크롤 위치를 newWeight와 일치하게 조정
      const targetIndex = weightArray.indexOf(newWeight);
      if (targetIndex !== -2) {
        flatListRef.current.scrollToIndex({
          index: targetIndex,
          animated: true,
        });
      }
      setModalVisible(false); // 모달 닫기
    } else {
      alert('Enter Your Weight');
    }
  };

  /* [Function] Continue 버튼 동작 */
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

  /* UI */
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

      <TouchableOpacity onPress={handleWeightInput}>
        <ResultContainer>
          <WeightText>
            {selectedWeight} {selectedUnit} 
            <Icon name="edit" size={height * 0.03} color={COLORS.dark_indigo} />
          </WeightText>
        </ResultContainer>
      </TouchableOpacity>

      {/* Modal 구현 */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Enter Your Weight</ModalTitle>
            <StyledTextInput
              value={inputWeight}
              onChangeText={setInputWeight}
              keyboardType="numeric"
              placeholder="Enter Yout Weight"
            />
            <ModalButtonContainer>
              <ModalButton onPress={() => setModalVisible(false)}>
                <ModalButtonText>Cancel</ModalButtonText>
              </ModalButton>
              <ModalButton onPress={handleConfirmWeight}>
                <ModalButtonText>OK</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>

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


/* styled-components */
const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  padding: 20px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: ${width * 0.05}px;
  font-weight: bold;
  color: ${COLORS.dark_indigo};
  margin-bottom: 20px;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  border: 1px solid ${COLORS.light_mist_grey};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ModalButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: ${COLORS.soft_blue};
`;

const ModalButtonText = styled.Text`
  color: ${COLORS.white};
  font-weight: bold;
`;

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
