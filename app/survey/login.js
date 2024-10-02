import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Image } from "react-native";
import styled from "styled-components/native"; 
import { COLORS, icons } from "../../constants";
import { useNavigation } from "expo-router";

const Login = () => {
  const navigation = useNavigation();
  const [first, onChangefirst] = useState("");
  const [last, onChangelast] = useState("");
  const [job, onChangejob] = useState("");
  const [email, onChangeemail] = useState("");
  const [pw, onChangepw] = useState("");
  const [pw2, onChangepw2] = useState("");

  return (
    <Container>
      <Header>
        <HeaderText>Fill Your Profile</HeaderText>
      </Header>
      <ProfileFrame>
        <ProfileImage source={icons.profile} />
        <EditIcon source={icons.pen} />
      </ProfileFrame>
      <ScrollView>
        <Form>
          <InputField>
            <Label>First Name</Label>
            <Input
              value={first}
              onChangeText={onChangefirst}
              placeholder="Enter Your First Name"
            />
          </InputField>
          <InputField>
            <Label>Last Name</Label>
            <Input
              value={last}
              onChangeText={onChangelast}
              placeholder="Enter Your Last Name"
            />
          </InputField>
          <InputField>
            <Label>Job</Label>
            <Input
              value={job}
              onChangeText={onChangejob}
              placeholder="Enter Your Job"
            />
          </InputField>
          <InputField>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={onChangeemail}
              placeholder="Enter Your Email"
            />
          </InputField>
          <InputField>
            <Label>Password</Label>
            <Input
              value={pw}
              onChangeText={onChangepw}
              placeholder="Enter Your Password"            />
          </InputField>
          <InputField>
            <Label>Please Enter It Again</Label>
            <Input
              value={pw2}
              onChangeText={onChangepw2}
              placeholder="Please Enter It Again"            />
          </InputField>
        </Form>
      </ScrollView>
      <StartButton onPress={() => navigation.navigate("gender")}>
        <ButtonText>Start</ButtonText>
      </StartButton>
    </Container>
  );
};

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
  font-family: "Poppins-Bold";
  font-weight: bold;
`;

const ProfileFrame = styled.View`
  background-color: #aeb8fe;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
`;

const ProfileImage = styled(Image)`
  border-radius: 97px;
  width: 125px;
  height: 125px;
`;

const EditIcon = styled(Image)`
  position: absolute;
  top: 102px;
  left: 231px;
  width: 27px;
  height: 27px;
`;

const Form = styled.View`
  padding: 15px 10px;
  flex-direction: center;
  align-items: center;
`;

const InputField = styled.View`
  width: 322px;
  gap: 3px;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: "LeagueSpartan-Medium";
  font-weight: bold;
`;

const Input = styled(TextInput)`
  padding: 10px;
  border: 1px solid #27187e;
  border-radius: 15px;
  background-color: ${COLORS.white};
  color: ${COLORS.soft_blue};
  font-family: "LeagueSpartan-Medium";
  font-weight: 500;
  font-size: 18px;
`;

const StartButton = styled(TouchableOpacity)`
  position: absolute;
  top: 720px;
  left: 106px;
  border-radius: 100px;
  background-color: #27187e;
  width: 179px;
  padding: 10px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "Poppins-Bold";
  font-weight: bold;
  text-align: center;
`;

export default Login;
