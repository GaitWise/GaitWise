import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants';

const { width, height } = Dimensions.get('window');

// 기존 Styled Components 코드는 동일

export const BaseContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  width: 100%;
  height: ${height}px;
`;

export const FrameContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.View`
  margin-bottom: ${height *
  0.05}px; /* 상단 텍스트와 나머지 요소 사이 간격 조정 */
`;

export const ContentContainer = styled.View`
  align-items: center;
  gap: ${height * 0.04}px;
  width: 100%;
`;

export const HowOldAreYouContainer = styled.View`
  align-items: center;
`;

export const HowOldAreText = styled.Text`
  font-size: ${width * 0.08}px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;

export const AgeText = styled.Text`
  font-size: ${width * 0.15}px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-align: center;
`;

export const ArrowIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${height * 0.01}px;
`;

export const ArrowIcon = styled.Image`
  width: ${width * 0.1}px;
  height: ${width * 0.06}px;
`;

export const AgeContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  width: 100%;
  height: ${height * 0.15}px;
  align-items: center;
`;

export const AgeItem = styled.View`
  width: ${width * 0.15}px;
  justify-content: center;
  align-items: center;
`;

export const StyledAgeText = styled.Text`
  font-size: ${(props) => (props.isSelected ? width * 0.1 : width * 0.07)}px;
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

export const ButtonContainer = styled.View`
  margin-top: ${height * 0.04}px;
`;

export const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.6}px;
  height: ${height * 0.08}px;
  padding: ${height * 0.015}px;
  border-radius: ${width * 0.5}px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
  justify-content: center;
  align-items: center;
`;

export const ContinueText = styled.Text`
  font-size: ${width * 0.045}px;
  color: ${COLORS.white};
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;
