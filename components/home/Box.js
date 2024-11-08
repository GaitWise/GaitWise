import React from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';

const Iconbox = ({
  text = '기능면',
  innerSvgComponent: InnerSvgComponent,
  backgroundColor = '#93c19e',
}) => (
  <StyledPressable>
    <ImageContainer backgroundColor={backgroundColor}>
      {InnerSvgComponent && <InnerSvgComponent width={35} height={35} />}
    </ImageContainer>
    <StyledText>{text}</StyledText>
  </StyledPressable>
);

export default Iconbox;

// Styled Components for Iconbox
const StyledPressable = styled(Pressable)`
  gap: 4px;
  align-items: center;
  width: 23%;
  margin-bottom: 16px;
`;

const ImageContainer = styled.View`
  background-color: ${(props) => props.backgroundColor};
  padding: 10px;
  height: 62px;
  width: 62px;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 12px;
  color: #4b5563;
  font-weight: 700;
  text-align: center;
`;
