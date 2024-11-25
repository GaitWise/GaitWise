import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '@/constants';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.0579; // 📌 스크롤 아이템의 높이를 상수로 지정

// Styled Components
export const BaseContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  width: 100%;
  height: 100%;
`;

export const FrameContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${height * 0.08}px;
  gap: ${height * 0.03}px;
`;

export const QuestionContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: ${height * 0.02}px;
`;

export const QuestionText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-size: ${height * 0.04}px;
  font-weight: 700;
`;

export const HeightTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeightText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  font-size: ${height * 0.05}px;
  margin-right: 5px;
`;

export const HeightScrollContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  align-items: center;
  justify-content: center;
  width: ${width * 0.3}px;
  height: ${height * 0.4}px;
  border-radius: 10px;
`;

export const HeightItem = styled.View`
  justify-content: center;
  align-items: center;
  height: ${ITEM_HEIGHT}px;
`;

export const StyledHeightText = styled.Text`
  font-size: ${(props) =>
    props.isSelected ? `${height * 0.04}px` : `${height * 0.03}px`};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

export const ContinueButton = styled(TouchableOpacity)`
  width: ${width * 0.5}px;
  height: ${height * 0.08}px;
  border-radius: 100px;
  background-color: ${({ isFormValid }) =>
    isFormValid ? COLORS.dark_indigo : COLORS.continue_gray};
  justify-content: center;
  align-items: center;
  margin-top: ${height * 0.03}px;
`;

export const ContinueButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: ${height * 0.025}px;
  font-weight: 700;
  text-align: center;
`;
