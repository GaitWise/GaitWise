import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { COLORS, IMAGES } from '@/constants';
import { router, useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    job: '',
    email: '',
    pw: '',
    pw2: '',
  });
  const { firstName, lastName, job, email, pw, pw2 } = inputs;

  const handleInputChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return firstName && lastName && job && email && pw && pw2 && pw === pw2;
  };

  const navigateToHome = (projectName) => {
    navigation.navigate('home');
    console.log(`${projectName} 프로젝트로 이동합니다.`);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header>
          <HeaderText>Fill Your Profile</HeaderText>
        </Header>
        <ProfileFrame>
          <ProfileImage source={IMAGES.profile} />
        </ProfileFrame>
        <Form>
          <InputField>
            <Label>First Name</Label>
            <Input
              name="firstName"
              value={firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              placeholder="Enter Your First Name"
            />
          </InputField>
          <InputField>
            <Label>Last Name</Label>
            <Input
              name="lastName"
              value={lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              placeholder="Enter Your Last Name"
            />
          </InputField>
          <InputField>
            <Label>Job</Label>
            <Input
              name="job"
              value={job}
              onChangeText={(text) => handleInputChange('job', text)}
              placeholder="Enter Your Job"
            />
          </InputField>
          <InputField>
            <Label>Email</Label>
            <Input
              name="email"
              value={email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Enter Your Email"
            />
          </InputField>
          <InputField>
            <Label>Password</Label>
            <Input
              name="pw"
              value={pw}
              onChangeText={(text) => handleInputChange('pw', text)}
              placeholder="Enter Your Password"
              secureTextEntry
            />
          </InputField>
          <InputField>
            <Label>Please Enter It Again</Label>
            <Input
              name="pw2"
              value={pw2}
              onChangeText={(text) => handleInputChange('pw2', text)}
              placeholder="Please Enter It Again"
              secureTextEntry
            />
          </InputField>
        </Form>

        <StartButton
          onPress={() => {
            if (isFormValid()) {
              router.push('../survey/gender');
            }
          }}
          disabled={!isFormValid()}
          isFormValid={isFormValid()}
          activeOpacity={0.7}
        >
          <ButtonText>Start</ButtonText>
        </StartButton>
      </ScrollView>
    </Container>
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
  margin: ${height * 0.01}px;
`;

const HeaderText = styled.Text`
  font-size: ${width * 0.06}px;
  color: ${COLORS.dark_indigo};
  font-family: 'Poppins-Bold';
  font-weight: bold;
`;

const ProfileFrame = styled.View`
  background-color: ${COLORS.pastel_lavender};
  padding: ${height * 0.02}px;
  flex-direction: row;
  justify-content: center;
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
  font-family: 'LeagueSpartan-Medium';
  font-weight: bold;
`;

const Input = styled(TextInput)`
  padding: ${height * 0.015}px;
  border: 1px solid ${COLORS.dark_indigo};
  border-radius: ${width * 0.04}px;
  background-color: ${COLORS.white};
  color: ${COLORS.soft_blue};
  font-family: 'LeagueSpartan-Medium';
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
  font-family: 'Poppins-Bold';
  font-weight: bold;
  text-align: center;
`;
