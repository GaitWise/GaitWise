import * as React from "react";
import styled from "styled-components/native";
import { icons, COLORS } from "@/constants";
import { router } from "expo-router";
import { View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

// 페이지 이동
const edit_survey = "";
const doctors = "";
const notification = "";
const contact = "setting/contact";
const user_reset = "";

const data = {
  name: "Han JiSoo",
  phone: "010-1234-5678",
};

const Setting = () => {
  const [image, setImage] = React.useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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
          <UserName>{data.name}</UserName>
          <UserPhone>{data.phone}</UserPhone>
        </InfoContainer>
      </EditPicInfo>
      {/* 메뉴 */}
      <MenuContainer>
        {/* Edit Survey */}
        <PressableItemContainer onPress={() => router.push(edit_survey)}>
          <PressableItem>
            <StyledImage source={icons.edit} />
            <MenuText>Edit Survey (설문 조사)</MenuText>
          </PressableItem>
          <ArrowIcon source={icons.arrow_right} />
        </PressableItemContainer>
        <Separator />
        {/* Favorite Doctors */}
        <PressableItemContainer onPress={() => router.push(doctors)}>
          <PressableItem>
            <StyledImage source={icons.noti} />
            <MenuText>Favorite Doctors</MenuText>
          </PressableItem>
          <ArrowIcon source={icons.arrow_right} />
        </PressableItemContainer>
        <Separator />
        {/* Notification */}
        <PressableItemContainer onPress={() => router.push(notification)}>
          <PressableItem>
            <StyledImage source={icons.noti} />
            <MenuText>Notifications</MenuText>
          </PressableItem>
          <ArrowIcon source={icons.arrow_right} />
        </PressableItemContainer>
        <Separator />
        {/* Contact */}
        <PressableItemContainer onPress={() => router.push(contact)}>
          <PressableItem>
            <StyledImage source={icons.helpM} />
            <MenuText>Help and Support</MenuText>
          </PressableItem>
          <View>
            <ArrowIcon source={icons.arrow_right} />
          </View>
        </PressableItemContainer>
        <Separator />
        {/* User Reset */}
        <PressableItemContainer onPress={() => router.push(user_reset)}>
          <PressableItem>
            <StyledImage source={icons.reset} />
            <MenuText>User Reset</MenuText>
          </PressableItem>
          <ArrowIcon source={icons.arrow_right} />
        </PressableItemContainer>
      </MenuContainer>
    </ProfileContainer>
  );
};

export default Setting;

// Styled-components

const ProfileContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: flex-start;
`;

const StyledImage = styled.Image`
  width: 24px;
  height: 24px;
  resize-mode: cover;
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
  font-family: "Inter-SemiBold";
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
  font-family: "Inter-Bold";
`;

const UserPhone = styled.Text`
  font-size: 14px;
  color: ${COLORS.dark_indigo};
  font-family: "Inter-Regular";
  text-align: center;
`;

const MenuContainer = styled.View`
  padding: 0 24px;
  width: 100%;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  font-family: "Inter-Regular";
`;

const ArrowIcon = styled.Image`
  width: 14px;
  height: 14px;
`;
