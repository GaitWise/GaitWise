import { useState } from 'react';
import { router } from 'expo-router';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, IMAGES, icons } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';

/* 화면 크기 가져오기 */
const { width, height } = Dimensions.get('window');

/* [Screen] Profile 화면 */
const Profile = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // 이메일 형식 검증용 정규식
  const [image, setImage] = useState(IMAGES.profile); 
  const [inputs, setInputs] = useState({ firstName: '', lastName: '', job: '', email: '', passwd: '', Cpasswd: ''});
  const { firstName, lastName, job, email, passwd, Cpasswd } = inputs;

  /* [Funciton] 입력값 변경 핸들러 함수 */
  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value});
  };

  /* [Funciton] Form 유효성 검사 함수 */
  const isFormValid = () => {
    return (
      firstName && lastName &&
      job && email &&
      passwd && Cpasswd &&
      passwd === Cpasswd &&
      emailRegex.test(email)
    );
  };

  /* [Funciton] 갤러리에서 이미지 선택 함수 */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // 이미지 편집 허용
      aspect: [1, 1], // 정사각형 비율
      quality: 1, // 품질 설정
    });

    if (!result.canceled) { setImage({ uri: result.assets[0].uri })}
  };

  /* [Funciton] Continue 버튼 기능 함수 */
  const handleContinue = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const { Cpasswd, ...dataToSave } = inputs;
    try {
      await AsyncStorage.setItem('input', JSON.stringify(dataToSave));
      router.push('../survey/gender');
    } catch (error) {
      console.error('Failed to save profile data:', error);
    }
  };

  /* UI */
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <Container>
        <Header>
          <HeaderText>Fill Your Profile</HeaderText>
        </Header>

        <ProfileFrame>
          <EditPic onPress={pickImage}>
            <ProfileImage source={image} resizeMode="cover" />
            <EditIconContainer>
              <icons.pen size={24} color={COLORS.dark_indigo} />
            </EditIconContainer>
          </EditPic>
        </ProfileFrame>

        <Form>
          {fields.map((field) => (
            <InputField
              key={field.name}
              style={{ marginTop: field.name === 'Cpasswd' ? -20 : 0 }}
            >
              <Label>{field.label}</Label>
              <Input
                value={inputs[field.name]}
                onChangeText={(text) => handleInputChange(field.name, text)}
                placeholder={field.placeholder}
                placeholderTextColor={COLORS.light_gray}
                secureTextEntry={field.secureTextEntry}
              />
            </InputField>
          ))}
        </Form>

        <StartButton
          onPress={handleContinue}
          disabled={!isFormValid()}
          isFormValid={isFormValid()}
          activeOpacity={0.7}
        >
          <ButtonText>Start</ButtonText>
        </StartButton>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

/* styled-components */
const EditPic = styled(TouchableOpacity)`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const EditIconContainer = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50px;
  padding: 5px;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
  overflow: hidden;
  height: 100%;
`;

const Header = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HeaderText = styled.Text`
  font-size: ${width * 0.06}px;
  color: ${COLORS.dark_indigo};
  font-weight: bold;
`;

const ProfileFrame = styled.View`
  background-color: ${COLORS.pastel_lavender};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  border-radius: ${width * 0.3}px;
  width: ${width * 0.36}px;
  height: ${width * 0.36}px;
`;

const Form = styled.View`
  padding: 5px;
  flex-direction: center;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const InputField = styled.View`
  width: ${width * 0.8}px;
  gap: ${height * 0.005}px;
`;

const Label = styled.Text`
  font-size: ${width * 0.045}px;
  color: ${COLORS.black};
  font-weight: bold;
`;

const Input = styled(TextInput)`
  padding: ${height * 0.015}px;
  border: 1px solid ${COLORS.dark_indigo};
  border-radius: ${width * 0.04}px;
  background-color: ${COLORS.white};
  color: ${COLORS.soft_blue};
  font-weight: 500;
  font-size: ${width * 0.045}px;
`;

const StartButton = styled(TouchableOpacity)`
  border-radius: ${width * 0.25}px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
  width: ${width * 0.5}px;
  padding: ${height * 0.015}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 5px;
`;

const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: ${width * 0.045}px;
  font-weight: bold;
  text-align: center;
`;

/* 입력 필드 정의 */
const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter Your First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter Your Last Name',
  },
  { name: 'job', label: 'Job', placeholder: 'Enter Your Job' },
  { name: 'email', label: 'Email', placeholder: 'Enter Your Email' },
  {
    name: 'passwd',
    label: 'Password',
    placeholder: 'Enter Your Password',
    secureTextEntry: true,
  },
  {
    name: 'Cpasswd',
    label: '',
    placeholder: 'Please Enter It Again',
    secureTextEntry: true,
  },
];