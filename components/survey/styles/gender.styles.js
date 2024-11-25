import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '@/constants';

const { width, height } = Dimensions.get('window');

export const GenderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.white};
`;

export const GenderContent = styled.View`
  align-items: center;
  justify-content: space-between;
  height: ${height * 0.75}px;
  width: 100%;
`;

export const TitleText = styled.Text`
  font-size: ${width * 0.08}px;
  color: ${COLORS.dark_indigo};
  font-weight: bold;
  text-align: center;
`;

export const GenderSelection = styled.View`
  gap: ${height * 0.03}px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const GenderButton = styled(TouchableOpacity)`
  align-items: center;
`;

export const MaleIconContainer = styled.View`
  width: ${width * 0.38}px;
  height: ${width * 0.38}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? COLORS.soft_blue : COLORS.continue_gray};
  border-radius: ${width * 0.2}px;
`;

export const FemaleIconContainer = styled.View`
  width: ${width * 0.38}px;
  height: ${width * 0.38}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? COLORS.bright_pink : COLORS.continue_gray};
  border-radius: ${width * 0.2}px;
`;

export const GenderLabel = styled.Text`
  font-size: ${width * 0.05}px;
  font-weight: 700;
  color: ${COLORS.black};
  margin-top: ${height * 0.01}px;
`;

export const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.6}px;
  height: ${height * 0.08}px;
  padding: ${height * 0.015}px;
  border-radius: ${width * 0.5}px;
  background-color: ${(props) =>
    props.selected && !props.bothSelected
      ? COLORS.dark_indigo
      : COLORS.continue_gray};
  justify-content: center;
  align-items: center;
`;

export const ContinueText = styled.Text`
  font-size: ${width * 0.05}px;
  color: ${COLORS.white};
  font-weight: bold;
`;