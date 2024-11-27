import * as React from 'react';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Modal, Alert } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { icons, COLORS, IMAGES } from '@/constants';
import { Delete_User } from '../../../services/setting/userdelete';
import { Inquiry_User } from '../../../services/setting/usernquiry';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 페이지 이동 경로
const contact = 'setting/contact';
const requierdsurvey = 'survey/gender';

/* [Screen] Setting 페이지 */
const Setting = () => {
  const [image, setImage] = React.useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: ''});
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [editSurveyModalVisible, setEditSurveyModalVisible] = React.useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = React.useState(false);

  /* [Function] 갤러리에서 이미지 선택 함수 */
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

  /* [Effect] AsyncStorage에서 사용자 ID 및 프로젝트 정보 가져오기 */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('finalData');
        const projectData = await AsyncStorage.getItem('currentProject');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const userIdFromStorage = parsedUserData.user; 

          // 서버에서 사용자 정보 요청
          const response = await Inquiry_User(userIdFromStorage);
          console.log('User info response:', response);

          if (
            response &&
            response.user &&
            response.user.firstname &&
            response.user.lastname
          ) {
            setUserInfo({
              firstName: response.user.firstname,
              lastName: response.user.lastname,
            });
          } else {
            console.error('Invalid user data received.');
          }
        }

        // 현재 프로젝트 ID 저장
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

   /* [Function] 계정 삭제 처리 함수 */
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
      console.log('userId: ', userId);

      // API 호출을 통해 사용자 상태를 'deleted'로 변경
      const response = await Delete_User(userId);
      console.log('response: ', response);

      Alert.alert('Success', 'Your account has been deleted successfully.');
      router.push('/profile'); 
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  
  /* UI */
  return (
    <ProfileContainer>
      {/* 프로필 텍스트 */}
      <TitleContainer>
        <Title>Profile</Title>
      </TitleContainer>

      {/* 프로필 사진 */}
      <EditPicPressable onPress={pickImage}>
        <EditPic source={image ? { uri: image } : IMAGES.profile} />
        <EditIconContainer>
          <icons.pen />
        </EditIconContainer>
      </EditPicPressable>

      <UserInfoContainer>
        <UserName>{`${userInfo.firstName} ${userInfo.lastName}`}</UserName>
      </UserInfoContainer>

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
                  title="Essential Survey"
                  onPress={() => router.push(requierdsurvey)}
                  color={COLORS.deep_slate_blue}
                />
                <AButton
                  title="Custom Survey"
                  onPress={() => {
                    if (currentProject) {
                      router.push({
                        pathname: '/survey/selection',
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

/* styled-components */
const EditPicPressable = styled.Pressable`
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const EditIcon = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: ${COLORS.white};
`;

const EditIconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: ${COLORS.soft_blue};
  border-radius: 20px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
`;

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
  font-weight: bold;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-SemiBold';
`;

const EditPic = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px; /* 원형 */
  background-color: ${COLORS.light_gray};
`;

const UserInfoContainer = styled.View`
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
  marginTop: 15px;
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