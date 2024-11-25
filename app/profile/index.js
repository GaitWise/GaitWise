import { useState } from 'react';
import { router } from 'expo-router';
import { COLORS, IMAGES } from '@/constants';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Header,
  HeaderText,
  ProfileFrame,
  ProfileImage,
  Form,
  InputField,
  Label,
  Input,
  StartButton,
  ButtonText,
} from '@/components/profile/styles/profile.styles';

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
