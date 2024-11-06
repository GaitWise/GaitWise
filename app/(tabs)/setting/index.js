import * as React from "react";
import styled from "styled-components/native";
import { icons, image, COLORS } from "../../../constants";
import { router } from "expo-router";
import { TouchableOpacity, Platform, SafeAreaView } from "react-native";

const isWeb = Platform.OS === "web";

const Setting = () => {
  return (
    <ProfileContainer>
      <Container>
        <Content>
          {/* 프로필 텍스트 */}
          <TitleContainer>
            <Title>Profile</Title>
          </TitleContainer>
          {/* 프로필 사진 */}
          <EditPicInfo>
            <EditPic source={image.profile} />
            <InfoContainer>
              <UserName>Daniel Martinez</UserName>
              <UserPhone>+123 856479683</UserPhone>
            </InfoContainer>
          </EditPicInfo>
          {/* 메뉴 */}
          <MenuContainer>
            {/* Edit Survey */}
            <PressableItemContainer onPress={() => {}}>
              <PressableItem>
                <StyledImage source={icons.edit} />
                <MenuText>Edit Survey (설문 조사)</MenuText>
              </PressableItem>
              <ArrowIcon source={icons.arrow_right} />
            </PressableItemContainer>
            <Separator />
            {/* Favorite Doctors */}
            <PressableItemContainer onPress={() => {}}>
              <PressableItem>
                <StyledImage source={icons.favorite} />
                <MenuText>Favorite Doctors</MenuText>
              </PressableItem>
              <ArrowIcon source={icons.arrow_right} />
            </PressableItemContainer>
            <Separator />
            {/* Notification */}
            <PressableItemContainer onPress={() => {}}>
              <PressableItem>
                <StyledImage source={icons.noti} />
                <MenuText>Notifications</MenuText>
              </PressableItem>
              <ArrowIcon source={icons.arrow_right} />
            </PressableItemContainer>
            <Separator />
            {/* Contact */}
            <PressableItemContainer
              onPress={() => router.push("setting/contact")}
            >
              <PressableItem>
                <StyledImage source={icons.helpM} />
                <MenuText>Help and Support</MenuText>
              </PressableItem>
              <TouchableOpacity onPress={() => router.push("setting/contact")}>
                <ArrowIcon source={icons.arrow_right} />
              </TouchableOpacity>
            </PressableItemContainer>
            <Separator />
            {/* User Reset */}
            <PressableItemContainer onPress={() => {}}>
              <PressableItem>
                <StyledImage source={icons.reset} />
                <MenuText>User Reset</MenuText>
              </PressableItem>
              <ArrowIcon source={icons.arrow_right} />
            </PressableItemContainer>
          </MenuContainer>
        </Content>
      </Container>
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

const Container = styled.View`
  width: ${isWeb ? "390px" : "100%"};
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 24px;
  height: 24px;
  resize-mode: cover;
`;

const Content = styled.View`
  height: ${isWeb ? "auto" : "100%"};
  width: ${isWeb ? "390px" : "100%"};
  justify-content: flex-start;
  align-items: center;
`;

const TitleContainer = styled.View`
  align-self: stretch;
  height: 30px;
  justify-content: center;
  align-items: center;
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
  margin: 20px;
`;

const EditPic = styled.Image`
  width: 180px;
  height: 180px;
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
