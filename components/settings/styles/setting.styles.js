import styled from 'styled-components/native';
import { COLORS } from '@/constants';

// Styled-components
export const TitleWrapper = styled.View`
  margin-horizontal: 20px;
  align-items: center;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 30px;
`;

export const ModalContent = styled.View`
  background-color: ${COLORS.white};
  width: 350px;
  height: 200px;
  border-radius: 20px;
`;
export const ProfileContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: flex-start;
`;

export const TitleContainer = styled.View`
  align-self: stretch;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-SemiBold';
`;

export const EditPicInfo = styled.View`
  padding: 16px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const EditPic = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 90px;
  background-color: ${COLORS.light_gray};
`;

export const InfoContainer = styled.View`
  align-items: center;
  gap: 4px;
  margin-top: 20px;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-Bold';
`;

export const UserPhone = styled.Text`
  font-size: 14px;
  color: ${COLORS.dark_indigo};
  font-family: 'Inter-Regular';
  text-align: center;
`;

export const MenuContainer = styled.View`
  padding: 0 24px;
  width: 100%;
`;

export const Separator = styled.View`
  height: 1px;
  border-top-width: 1px;
  border-color: ${COLORS.light_gray};
  margin: 8px 0;
`;

export const PressableItemContainer = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

export const PressableItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const MenuText = styled.Text`
  font-size: 18px;
  color: ${COLORS.dark_gray};
  font-family: 'Inter-Regular';
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.dark_indigo};
`;

export const XButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const XButton = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

export const AButton = styled.Button`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
