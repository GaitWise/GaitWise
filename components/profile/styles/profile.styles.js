import styled from 'styled-components/native';
import { Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { COLORS } from '@/constants';

const { width, height } = Dimensions.get('window');

// styled-components
export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
  overflow: hidden;
`;

export const Header = styled.View`
  height: ${height * 0.1}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HeaderText = styled.Text`
  font-size: ${width * 0.06}px;
  color: ${COLORS.dark_indigo};
  font-weight: bold;
`;

export const ProfileFrame = styled.View`
  background-color: ${COLORS.pastel_lavender};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ProfileImage = styled(Image)`
  border-radius: ${width * 0.3}px;
  width: ${width * 0.33}px;
  height: ${width * 0.33}px;
`;

export const Form = styled.View`
  padding: ${height * 0.02}px ${width * 0.03}px;
  flex-direction: center;
  align-items: center;
  width: 100%;
`;

export const InputField = styled.View`
  width: ${width * 0.8}px;
  gap: ${height * 0.005}px;
`;

export const Label = styled.Text`
  font-size: ${width * 0.045}px;
  color: ${COLORS.black};
  font-weight: bold;
`;

export const Input = styled(TextInput)`
  padding: ${height * 0.015}px;
  border: 1px solid ${COLORS.dark_indigo};
  border-radius: ${width * 0.04}px;
  background-color: ${COLORS.white};
  color: ${COLORS.soft_blue};
  font-weight: 500;
  font-size: ${width * 0.045}px;
`;

export const StartButton = styled(TouchableOpacity)`
  border-radius: ${width * 0.25}px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
  width: ${width * 0.5}px;
  padding: ${height * 0.015}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: ${height * 0.02}px;
`;

export const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: ${width * 0.045}px;
  font-weight: bold;
  text-align: center;
`;
