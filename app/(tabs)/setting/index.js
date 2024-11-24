import * as React from 'react';
import { router } from 'expo-router';
import { icons, COLORS } from '@/constants';
import { Button, Modal } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';

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
                  title="templete Survey"
                  onPress={() => router.push(templetesurvey)}
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
