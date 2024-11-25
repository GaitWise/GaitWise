import * as React from 'react';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { icons, COLORS } from '@/constants';
import { Button, Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Inquiry_User } from '../../../services/setting/usernquiry';
import {Delete_User} from '../../../services/setting/userdelete'

// 페이지 이동
const contact = 'setting/contact';
const requierdsurvey = 'survey/gender';
const templetesurvey = 'survey/selection';

const Setting = () => {
  const [image, setImage] = React.useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [editSurveyModalVisible, setEditSurveyModalVisible] =
    React.useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    React.useState(false);
  const [userInfo, setUserInfo] = useState({
      firstName: '',
      lastName: '',
  });
  const [currentProject, setCurrentProject] = useState(null);

  // 내 갤러리 이미지 고르기 기능
  const pickImage = async () => {
    if (!status.granted) {
      const permission = await requestPermission();
      if (!permission.granted) return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // AsyncStorage에서 user_id 및 currentProject 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('finalData');
        const projectData = await AsyncStorage.getItem('currentProject');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const userIdFromStorage = parsedUserData.user; // user_id 가져오기
          console.log('Fetched user_id:', userIdFromStorage);

          // 서버에서 사용자 정보 요청
          const response = await Inquiry_User(userIdFromStorage);
          console.log('User info response:', response);

          if (response && response.user && response.user.firstname && response.user.lastname) {
            setUserInfo({
              firstName: response.user.firstname,
              lastName: response.user.lastname,
            });
          } else {
            console.error('Invalid user data received.');
          }
        }

        // currentProject 데이터 가져오기
        if (projectData) {
          const parsedProjectData = JSON.parse(projectData);
          console.log('Parsed current project:', parsedProjectData.project_id);
          setCurrentProject(parsedProjectData.project_id);
          console.log('Parsed current project:', currentProject);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);


  const deleteAccount = async () => {
    try {
      const userData = await AsyncStorage.getItem('finalData');
      if (!userData) {
        console.error('User ID not found in AsyncStorage.');
        Alert.alert('Error', 'User ID is required to delete the account.');
        return;
      }
  
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.user;
      console.log("userId: ", userId)

      // API 호출을 통해 사용자 상태를 'deleted'로 변경
      const response = await Delete_User(userId);
      console.log("response: ", response)
  
      Alert.alert('Success', 'Your account has been deleted successfully.');
      router.push('/profile'); // 성공 시 프로필 화면으로 이동
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <ProfileContainer>
      
      {/* 프로필 텍스트 */}
      <TitleContainer>
        <Title>Profile</Title>
      </TitleContainer>

      {/* 프로필 사진 */}
      <EditPicInfo>
        <EditPic source={image ? { uri: image } : icons.profile} />
        <Button title="Change Profile Picture" onPress={pickImage} />
        <InfoContainer>
          <UserName>{`${userInfo.firstName} ${userInfo.lastName}`}</UserName>
        </InfoContainer>
      </EditPicInfo>

      {/* 메뉴 */}
      <MenuContainer>
        {/* Edit Survey */}
        <PressableItemContainer onPress={() => setEditSurveyModalVisible(true)}>
          <PressableItem>
            <icons.edit />
            <MenuText>Edit Survey</MenuText>
          </PressableItem>
          <icons.arrow_right />
        </PressableItemContainer>
        <Separator />
        {/* Survey 수정 modal */}
        <Modal
          visible={editSurveyModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setEditSurveyModalVisible(false)}
        >
          <ModalContainer>
            <ModalContent>
              <XButtonWrapper>
                <XButton onPress={() => setEditSurveyModalVisible(false)}>
                  <icons.close />
                </XButton>
              </XButtonWrapper>
              <TitleWrapper>
                <ModalTitle>Edit your survey</ModalTitle>
              </TitleWrapper>
              <ButtonWrapper>
                <AButton
                  title="Required Survey"
                  onPress={() => router.push(requierdsurvey)}
                  color={COLORS.deep_slate_blue}
                />
                <AButton
                  title="Template Survey"
                  onPress={() => {
                    if (currentProject) {
                      router.push({
                        pathname: 'survey/selection',
                        params: { projectId: currentProject }, 
                      });
                    } else {
                      console.error('No current project found.');
                    }
                  }}
                  color={COLORS.deep_slate_blue}
                />
              </ButtonWrapper>
            </ModalContent>
          </ModalContainer>
        </Modal>

      
        {/* Contact */}
        <PressableItemContainer onPress={() => router.push(contact)}>
          <PressableItem>
            <icons.helpM />
            <MenuText>Help and Support</MenuText>
          </PressableItem>
          <icons.arrow_right />
        </PressableItemContainer>
        <Separator />
        {/* User Reset */}
        <PressableItemContainer
          onPress={() => setDeleteAccountModalVisible(true)}
        >
          <PressableItem>
            <icons.reset />
            <MenuText>Delete Account</MenuText>
          </PressableItem>
          <icons.arrow_right />
        </PressableItemContainer>
      </MenuContainer>

      {/* 계정 삭제 Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteAccountModalVisible}
        onRequestClose={() => setDeleteAccountModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <XButtonWrapper>
              <XButton onPress={() => setDeleteAccountModalVisible(false)}>
                <icons.close />
              </XButton>
            </XButtonWrapper>
            <TitleWrapper>
              <ModalTitle>
                Are you sure you want to {'\n'} delete your account?
              </ModalTitle>
            </TitleWrapper>
            <ButtonWrapper>
              <AButton
                title="Yes"
                onPress={async () => {
                  await deleteAccount();
                  setDeleteAccountModalVisible(false);
                }}
                color={COLORS.deep_slate_blue}
              />
              <AButton
                title="No"
                onPress={() => setDeleteAccountModalVisible(false)}
                color={COLORS.deep_slate_blue}
              />
            </ButtonWrapper>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </ProfileContainer>
  );
};

export default Setting;

// Styled-components

const TitleWrapper = styled.View`
  margin-horizontal: 20px;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 30px;
`;

const ModalContent = styled.View`
  background-color: ${COLORS.white};
  width: 350px;
  height: 200px;
  border-radius: 20px;
`;
const ProfileContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: flex-start;
`;

const TitleContainer = styled.View`
  align-self: stretch;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-SemiBold';
`;

const EditPicInfo = styled.View`
  padding: 16px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const EditPic = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 90px;
  background-color: ${COLORS.light_gray};
`;

const InfoContainer = styled.View`
  align-items: center;
  gap: 4px;
  margin-top: 20px;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-Bold';
`;

const UserPhone = styled.Text`
  font-size: 14px;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-Regular';
  text-align: center;
`;

const MenuContainer = styled.View`
  padding: 0 24px;
  width: 100%;
`;

const Separator = styled.View`
  height: 1px;
  border-top-width: 1px;
  border-color: ${COLORS.light_gray};
  margin: 8px 0;
`;

const PressableItemContainer = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const PressableItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const MenuText = styled.Text`
  font-size: 18px;
  color: ${COLORS.dark_gray};
  font-family: 'Inter-Regular';
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.dark_indigo};
`;

const XButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
`;

const XButton = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

const AButton = styled.Button`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
