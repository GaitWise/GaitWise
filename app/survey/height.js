import { COLORS } from '@/constants';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { saveUserData } from '../../services/user/usersave'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, FlatList, Dimensions, TextInput, Modal } from 'react-native';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.0579;

const Height = () => {
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const [inputHeight, setInputHeight] = useState('');

  const heightArray = Array.from({ length: 251 }, (_, index) => index);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedHeight(heightArray[newIndex]);
  };

  const isFormValid = () => selectedHeight >= 0 && selectedHeight <= 250;

  const handleHeightInput = () => {
    setInputHeight(selectedHeight > 0 ? selectedHeight.toString() : '');
    setModalVisible(true); // 모달 표시
  };

  const handleConfirmHeight = () => {
    const newHeight = parseInt(inputHeight);
    if (!isNaN(newHeight) && newHeight >= 0 && newHeight <= 250) {
      setSelectedHeight(newHeight);
      const targetIndex = heightArray.indexOf(newHeight);
      if (targetIndex !== -1) {
        flatListRef.current.scrollToIndex({
          index: targetIndex,
          animated: true,
        });
      }
      setModalVisible(false); // 모달 닫기
    } else {
      alert('Please enter a valid height (0-250 cm)');
    }
  };

  const handleContinue = async () => {
    try {
      const age = await AsyncStorage.getItem('selectedAge');
      const weight = await AsyncStorage.getItem('selectedWeight');
      const gender = await AsyncStorage.getItem('genderData');
      const profile = await AsyncStorage.getItem('input');

      const userData = {
        firstName: JSON.parse(profile).firstName,
        lastName: JSON.parse(profile).lastName,
        gender: JSON.parse(gender),
        age: JSON.parse(age),
        email: JSON.parse(profile).email,
        weight: JSON.parse(weight),
        height: selectedHeight,
        job: JSON.parse(profile).job,
        profile_image_url: '',
        password: JSON.parse(profile).passwd,
      };

      const response = await saveUserData(userData);

      const allData = {
        user: response.user._id,
        profile: JSON.parse(profile),
        gender: JSON.parse(gender),
        age: JSON.parse(age),
        weight: JSON.parse(weight),
        height: selectedHeight,
      };

      await AsyncStorage.setItem('finalData', JSON.stringify(allData));

      router.push(`/project_select`); // 경로 수정
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

        {/* 📌 selectedHeight 표시 및 클릭 시 handleHeightInput 호출 */}
        <TouchableOpacity onPress={handleHeightInput}>
          <HeightTextContainer>
            <HeightText>{selectedHeight} cm</HeightText>
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
              paddingVertical: (height * 0.4 - ITEM_HEIGHT) / 2,
            }}
            initialNumToRender={251}
          />
        </HeightScrollContainer>

        {/* 모달 */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <ModalContainer>
            <ModalContent>
              <ModalTitle>Enter Your Height</ModalTitle>
              <StyledTextInput
                value={inputHeight}
                onChangeText={setInputHeight}
                keyboardType="numeric"
                placeholder="Enter Your Height"
              />
              <ModalButtonContainer>
                <ModalButton onPress={() => setModalVisible(false)}>
                  <ModalButtonText>Cancel</ModalButtonText>
                </ModalButton>
                <ModalButton onPress={handleConfirmHeight}>
                  <ModalButtonText>OK</ModalButtonText>
                </ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalContainer>
        </Modal>

        <ContinueButton
          onPress={handleContinue}
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

const HeightTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeightText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  font-size: ${height * 0.05}px;
  margin-right: 5px;
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
  height: ${ITEM_HEIGHT}px;
`;

const StyledHeightText = styled.Text`
  font-size: ${(props) =>
    props.isSelected ? `${height * 0.04}px` : `${height * 0.03}px`};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.5}px;
  height: ${height * 0.08}px;
  border-radius: 100px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
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

const StyledTextInput = styled.TextInput`
  width: 100%;
  border: 1px solid ${COLORS.light_mist_grey};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${COLORS.white};
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
