import { useState } from 'react';
import { router } from 'expo-router';
import { COLORS, IMAGES } from '@/constants';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    job: '',
    email: '',
    passwd: '',
    Cpasswd: '',
  });
  const [image, setImage] = useState(IMAGES.profile); // 초기 프로필 이미지
  const { firstName, lastName, job, email, passwd, Cpasswd } = inputs;

  const handleInputChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      job &&
      email &&
      passwd &&
      Cpasswd &&
      passwd === Cpasswd
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

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
      label: 'Please Enter It Again',
      placeholder: 'Please Enter It Again',
      secureTextEntry: true,
    },
  ];

  const handleContinue = async () => {
    // 📌 cpasswd 제외
    const { Cpasswd, ...dataToSave } = inputs; // Cpasswd만 제외하고 나머지 데이터를 저장
    try {
      await AsyncStorage.setItem('input', JSON.stringify(dataToSave)); // cpasswd가 저장되지 않음
      router.push('../survey/gender'); // 다음 페이지로 이동
    } catch (error) {
      console.error('Failed to save profile data:', error);
    }
  };

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
          <ProfileImage source={image} />
          <Button title="Choose Your Profile Image" onPress={pickImage} />
        </ProfileFrame>

        <Form>
          {fields.map((field) => (
            <InputField key={field.name}>
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

// styled-components
const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
  overflow: hidden;
`;

const Header = styled.View`
  height: ${height * 0.1}px;
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
  padding: 10px;
`;

const ProfileImage = styled(Image)`
  border-radius: ${width * 0.3}px;
  width: ${width * 0.33}px;
  height: ${width * 0.33}px;
`;

const Form = styled.View`
  padding: ${height * 0.02}px ${width * 0.03}px;
  flex-direction: center;
  align-items: center;
  width: 100%;
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
  margin: ${height * 0.02}px;
`;

const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: ${width * 0.045}px;
  font-weight: bold;
  text-align: center;
`;
