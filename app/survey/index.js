import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { COLORS, IMAGES } from '../../constants';
import { useNavigation } from 'expo-router';

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

  // 모든 입력값이 존재하는지 및 pw와 pw2가 같은지 확인
  const isFormValid = () => {
    return firstName && lastName && job && email && pw && pw2 && pw === pw2;
  };

  return (
    <Container>
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
            navigation.navigate('gender');
          }
        }}
        disabled={!isFormValid()}
        isFormValid={isFormValid()}
        activeOpacity={0.7}
      >
        <ButtonText>Start</ButtonText>
      </StartButton>
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
  height: 76px;
  padding: 50px 0;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HeaderText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  text-align: left;
  font-family: 'Poppins-Bold';
  font-weight: bold;
`;

const ProfileFrame = styled.View`
  background-color: ${COLORS.pastel_lavender};
  padding: 10px;
  flex-direction: row;
  justify-content: center;
`;

const ProfileImage = styled(Image)`
  border-radius: 97px;
  width: 125px;
  height: 125px;
`;

const Form = styled.View`
  padding: 15px 10px;
  flex-direction: center;
  align-items: center;
  width: 100%;
`;

const InputField = styled.View`
  width: 322px;
  gap: 3px;
`;

const Label = styled.Text`
  font-size: 18px;
  color: ${COLORS.black};
  font-family: 'LeagueSpartan-Medium';
  font-weight: bold;
`;

const Input = styled(TextInput)`
  padding: 10px;
  border: 1px solid ${COLORS.dark_indigo};
  border-radius: 15px;
  background-color: ${COLORS.white};
  color: ${COLORS.soft_blue};
  font-family: 'LeagueSpartan-Medium';
  font-weight: 500;
  font-size: 18px;
`;

const StartButton = styled(TouchableOpacity)`
  border-radius: 100px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
  width: 179px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-family: 'Poppins-Bold';
  font-weight: bold;
  text-align: center;
`;
