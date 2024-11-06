import * as React from "react";
import styled from "styled-components/native";
import { useState } from "react";
import { Pressable } from "react-native";
import { COLORS } from "../../../constants";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native";

const isWeb = Platform.OS === "web";

const Contact = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  return (
      <ProfileContainer>
        <MainFrame>
          <ContactSection>
            {/* Title */}
            <TitleContainer>
              <ContactTitle>Contact Us</ContactTitle>
            </TitleContainer>
            <Description>
              <ContactDescription>
                Any question or remarks?
                {"\n"}
                Just write us a message!
              </ContactDescription>
            </Description>
            {/* 작성 부분 */}
            <InputGroup>
              <InputWrapper>
                <InputLabel>First Name</InputLabel>
                <StyledTextInput
                  value={inputs.firstName}
                  onChangeText={(value) => handleChange("firstName", value)}
                  placeholder="First Name"
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Last Name</InputLabel>
                <StyledTextInput
                  value={inputs.lastName}
                  onChangeText={(value) => handleChange("lastName", value)}
                  placeholder="Last Name"
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel>Email</InputLabel>
                <StyledTextInput
                  value={inputs.email}
                  onChangeText={(value) => handleChange("email", value)}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </InputWrapper>
              <MessageInputWrapper>
                <InputLabel>Write your message</InputLabel>
                <StyledTextInput
                  value={inputs.message}
                  onChangeText={(value) => handleChange("message", value)}
                  placeholder="Write your message.."
                  multiline
                />
              </MessageInputWrapper>
            </InputGroup>
            {/* send 버튼 */}
            <SendButton>
              <SendButtonText>Send Message</SendButtonText>
            </SendButton>
          </ContactSection>
        </MainFrame>
      </ProfileContainer>
  );
};

export default Contact;

const Description = styled.View`
  margin: 10px;
`;

const TitleContainer = styled.View`
  align-self: stretch;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
`;

const ProfileContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${COLORS.white};
  justify-content: flex-start;
  align-items: center;
`;

const MainFrame = styled.View`
  width: 390px;
  align-items: center;
  justify-content: center;
`;

const ContactSection = styled.View`
  align-items: center;
  width: 286px;
`;

const ContactTitle = styled.Text`
  font-size: 25px;
  font-weight: 700;
  color: ${COLORS.dark_indigo};
  text-align: center;
`;

const ContactDescription = styled.Text`
  color: ${COLORS.dark_gray};
  font-size: 14px;
  text-align: center;
`;

const InputGroup = styled.View`
  align-items: center;
  margin-top: 42px;
`;

const InputWrapper = styled.View`
  height: 55px;
  width: 278px;
  margin-bottom: 30px;
`;

const InputLabel = styled.Text`
  font-size: 12px;
  color: ${COLORS.dark_gray};
  font-family: Poppins-Medium;
  text-align: left;
  margin-bottom: 10px;
`;

const MessageInputWrapper = styled.View`
  height: 120px;
  width: 278px;
`;

const StyledTextInput = styled.TextInput`
  width: 278px;
  font-size: 14px;
  color: ${COLORS.medium_gray};
  border: 1px solid ${COLORS.dark_gray};
  padding: 10px;
  border-radius: 5px;
  height: ${(props) => (props.multiline ? "100%" : "42px")};
`;

const SendButton = styled(Pressable)`
  padding: 10px;
  border-radius: 10px;
  background-color: ${COLORS.dark_indigo};
  width: 285px;
  height: 38px;
  justify-content: center;
  align-items: center;
  margin-top: 59px;
`;

const SendButtonText = styled.Text`
  font-size: 13px;
  color: ${COLORS.white};
  font-family: Poppins-Medium;
  text-align: center;
`;
