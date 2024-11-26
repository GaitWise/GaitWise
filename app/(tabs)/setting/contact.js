import * as React from 'react';
import styled from 'styled-components/native';
import { useState, useEffect } from 'react';
import { Pressable, Alert } from 'react-native';
import { COLORS } from '@/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { contact_post } from '../../../services/setting/contact';

const Contact = () => {
  const [inputs, setInputs] = useState({
    title: '',
    email: '',
    message: '',
  });

  const [author, setAuthor] = useState(null); // user_id 저장

  // AsyncStorage에서 user_id 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem('finalData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          const userIdFromStorage = parsedData.user; // user_id 가져오기
          setAuthor(userIdFromStorage);
          console.log('Fetched user_id:', userIdFromStorage);
        }
      } catch (error) {
        console.error('Error fetching user_id:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const isFormComplete =
    Object.values(inputs).every((value) => value !== '') && author !== null;

  const handleSend = async () => {
    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill out all fields before submitting.');
      return;
    }

    try {
      const { title, email, message } = inputs;
      const response = await contact_post(title, message, author, email);
      Alert.alert('Success', 'Your message has been sent!');
      console.log('Server response:', response);

      // 폼 초기화
      setInputs({
        title: '',
        email: '',
        message: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to send your message. Please try again.');
      console.error('Error sending contact form:', error);
    }
  };

  const fields = [
    { label: 'Title', name: 'title', placeholder: 'Title' },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
      keyboardType: 'email-address',
    },
    {
      label: 'Message',
      name: 'message',
      placeholder: 'Write your message...',
      multiline: true,
    },
  ];

  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
      <ProfileContainer>
        <MainFrame>
          <ContactSection>
            {/* Title */}
            <TitleContainer>
              <ContactTitle>Contact Us</ContactTitle>
            </TitleContainer>
            <Description>
              <ContactDescription>
                Any questions or remarks?{'\n'}Just write us a message!
              </ContactDescription>
            </Description>
            {/* Form Fields */}
            <InputGroup>
              {fields.map((field, index) => (
                <InputField
                  key={index}
                  label={field.label}
                  value={inputs[field.name]}
                  onChangeText={(value) => handleChange(field.name, value)}
                  placeholder={field.placeholder}
                  keyboardType={field.keyboardType}
                  multiline={field.multiline}
                />
              ))}
            </InputGroup>
            {/* Send Button */}
            <SendButton onPress={handleSend} disabled={!isFormComplete} isDisabled={!isFormComplete}>
              <SendButtonText>Send Message</SendButtonText>
            </SendButton>
          </ContactSection>
        </MainFrame>
      </ProfileContainer>
    </KeyboardAwareScrollView>
  );
};

export default Contact;

// InputField 컴포넌트
const InputField = ({ label, value, onChangeText, placeholder, keyboardType, multiline }) => (
  <InputWrapper style={{ height: multiline ? 200 : 50 }}>
    <InputLabel>{label}</InputLabel>
    <StyledTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.dark_gray}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </InputWrapper>
);

// Styled components
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
  height: 100%;
  align-items: center;
  justify-content: flex-start;
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
  margin-top: 30px;
`;

const InputWrapper = styled.View`
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

const StyledTextInput = styled.TextInput`
  width: 278px;
  font-size: 14px;
  color: ${COLORS.medium_gray};
  border: 1px solid ${COLORS.dark_gray};
  padding: 10px;
  border-radius: 5px;
  height: 100%;
`;

const SendButton = styled(Pressable)`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDisabled ? COLORS.light_gray : COLORS.dark_indigo};
  width: 285px;
  height: 38px;
  justify-content: center;
  align-items: center;
  margin: 45px;
`;

const SendButtonText = styled.Text`
  font-size: 13px;
  color: ${COLORS.white};
  font-family: Poppins-Medium;
  text-align: center;
`;
