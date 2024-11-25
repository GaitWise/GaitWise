import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../../../constants';

const { width, height } = Dimensions.get('window');
const ITEM_WEIGHT = width * 0.18;

// Styled Components
export const WeightText = styled.Text`
  font-size: ${width * 0.1}px;
  color: ${COLORS.dark_indigo};
  font-weight: 700;
  text-align: center;
`;

export const StyledWeightText = styled.Text`
  font-size: ${(props) => (props.isSelected ? width * 0.08 : width * 0.05)}px;
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-weight: 700;
`;

export const WeightItem = styled.View`
  width: ${width * 0.18}px;
  justify-content: center;
  align-items: center;
`;

export const WeightContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  width: 100%;
  height: ${height * 0.18}px;
  align-items: center;
  margin-top: 20px;
`;

export const BaseFrameContainer = styled.View`
  background-color: ${COLORS.white};
  flex: 1;
  align-items: center;
  gap: ${height * 0.02}px;
`;

export const QContainer = styled.View`
  height: ${height * 0.18}px;
  justify-content: center;
  align-items: center;
`;

export const QText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-size: ${width * 0.08}px;
  font-weight: 700;
`;

export const KgContainer = styled.View`
  justify-content: space-between;
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  align-items: center;
  border-radius: ${width * 0.035}px;
  width: ${width * 0.85}px;
  padding-vertical: ${height * 0.01}px;
`;

export const UnitText = styled.Text`
  width: ${width * 0.35}px;
  font-weight: 700;
  font-size: ${width * 0.05}px;
  text-align: center;
  color: ${(props) =>
    props.isSelected ? COLORS.dark_indigo : COLORS.light_mist_grey};
`;

export const Divider = styled.View`
  width: ${width * 0.01}px;
  background-color: ${COLORS.light_mist_grey};
  height: ${height * 0.05}px;
`;

export const ResultContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;
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
  margin-top: 20px;
`;

export const ContinueButtonText = styled.Text`
  font-size: ${width * 0.045}px;
  color: ${COLORS.white};
  text-align: center;
  font-weight: 700;
`;
