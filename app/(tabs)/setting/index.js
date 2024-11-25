import * as React from 'react';
import { icons, COLORS } from '@/constants';
import { router } from 'expo-router';
import { Button, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  TitleWrapper,
  ButtonWrapper,
  ModalContent,
  ProfileContainer,
  TitleContainer,
  Title,
  EditPicInfo,
  EditPic,
  InfoContainer,
  UserName,
  UserPhone,
  MenuContainer,
  Separator,
  PressableItem,
  PressableItemContainer,
  MenuText,
  ModalContainer,
  ModalTitle,
  XButtonWrapper,
  XButton,
  AButton,
} from '@/components/settings/styles/setting.styles';

// 페이지 이동
const requierdsurvey = 'survey/gender';
const templetesurvey = 'survey/surveyPage';
const doctors = '';
const notification = '';
const contact = 'setting/contact';

const Setting = () => {
  const [image, setImage] = React.useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [editSurveyModalVisible, setEditSurveyModalVisible] =
    React.useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    React.useState(false);

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

  // 계정 삭제
  const deleteAccount = async () => {
    try {
      // 서버와 연동된 계정 삭제 API 호출 (예시)
      const response = await fetch('https://your-api.com/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user123', // 실제 사용자 ID
        }),
      });

      if (response.ok) {
        console.log('계정 삭제 완료');
        // 로그아웃 또는 초기 화면으로 이동
        router.push('/profile');
      } else {
        console.error('계정 삭제 실패');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  // user data
  const data = {
    firstName: 'Han',
    lastName: 'Jisoo',
    phone: '010-1234-5678',
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
          <UserName>{`${data.firstName} ${data.lastName}`}</UserName>
          <UserPhone>{data.phone}</UserPhone>
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
                  title="templete Survey"
                  onPress={() => router.push(templetesurvey)}
                  color={COLORS.deep_slate_blue}
                />
              </ButtonWrapper>
            </ModalContent>
          </ModalContainer>
        </Modal>

        <Separator />
        {/* Favorite Doctors */}
        <PressableItemContainer onPress={() => router.push(doctors)}>
          <PressableItem>
            <icons.favorite />
            <MenuText>Favorite Doctors</MenuText>
          </PressableItem>
          <icons.arrow_right />
        </PressableItemContainer>
        <Separator />
        {/* Notification */}
        <PressableItemContainer onPress={() => router.push(notification)}>
          <PressableItem>
            <icons.noti />
            <MenuText>Notifications</MenuText>
          </PressableItem>
          <icons.arrow_right />
        </PressableItemContainer>
        <Separator />
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
