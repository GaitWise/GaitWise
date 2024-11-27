import { COLORS } from '@/constants';
import styled from 'styled-components/native';
import { Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { contact_post } from '../../../services/setting/contact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Contact = () => {
  const [author, setAuthor] = useState(null);
  const [inputs, setInputs] = useState({ title: '', email: '', message: ''});

  /* [Effect] AsyncStorage에서 user_id 가져오기 */
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem('finalData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          const userIdFromStorage = parsedData.user; 
          setAuthor(userIdFromStorage);
        }
      } catch (error) {
        console.error('Error fetching user_id:', error);
      }
    };

    fetchUserId();
  }, []);

  const isFormComplete = Object.values(inputs).every((value) => value !== '') && author !== null;

  /* [Function] 입력값 업데이트 함수 */
  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  /* [Function] 유저 문의 제출 처리 함수 */
  const handleSend = async () => {
    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill out all fields before submitting.');
      return;
    }
    
    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      const { title, email, message } = inputs;
      const response = await contact_post(title, message, author, email);
      Alert.alert('Success', 'Your message has been sent!');
      console.log('Server response:', response);

      setInputs({ title: '', email: '', message: ''});
    } catch (error) {
      Alert.alert('Error', 'Failed to send your message. Please try again.');
      console.error('Error sending contact form:', error);
    }
  };

  /* 입력 필드 설정 */
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
  
  /* UI */
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
      }} /* 스크롤 컨테이너가 화면 전체를 채우도록 설정 */
    >
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
            <SendButton
              onPress={handleSend}
              disabled={!isFormComplete}
              isDisabled={!isFormComplete}
            >
              <SendButtonText>Send Message</SendButtonText>
            </SendButton>
          </ContactSection>
        </MainFrame>
      </ProfileContainer>
    </KeyboardAwareScrollView>
  );
};

export default Contact;

/* [Function] InputField 컴포넌트 함수 */
const InputField = ({ label, value, onChangeText, placeholder, keyboardType, multiline}) => 
  (
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

/* styled-components */
const Description = styled.View`
  margin: 10px;
`;

const TitleContainer = styled.View`
  align-self: stretch;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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
  margin-top: 5px;
`;

const InputWrapper = styled.View`
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`;

const InputLabel = styled.Text`
  font-size: 12px;
  color: ${COLORS.dark_gray};
  font-family: Poppins-Medium;
  text-align: left;
  margin-bottom: 5px;
`;

const StyledTextInput = styled.TextInput`
  width: 278px;
  font-size: 14px;
  color: ${COLORS.medium_gray};
  border: 1px solid ${COLORS.dark_gray};
  padding: 10px;
  border-radius: 5px;
  height: 90%;
`;

const SendButton = styled(Pressable)`
  border-radius: 15px;
  background-color: ${(props) =>
    props.isDisabled ? COLORS.light_gray : COLORS.dark_indigo};
  width: 285px;
  height: 45px; /* 버튼 높이 지정 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  margin: 5px;
`;

const SendButtonText = styled.Text`
  font-size: 14px; /* 조금 더 명확한 크기 지정 */
  color: ${COLORS.white};
  font-family: Poppins-Medium;
  text-align: center; /* 텍스트 정렬 */
  line-height: 38px; /* 버튼 높이와 동일하게 설정 */
`;
