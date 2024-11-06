import React from 'react';
import styled from 'styled-components/native';

export default function Iconbox({
  text = '기능면',
  IconComponent,
  backgroundColor = '#93c19e',
}) {
  return (
    <StyledPressable>
      <ImageContainer backgroundColor={backgroundColor}>
        <IconComponent width={35} height={31} /> 
      </ImageContainer>
      <StyledText>{text}</StyledText>
    </StyledPressable>
  );
}

const StyledPressable = styled.Pressable`
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
  gap: 10px;
  align-items: center;
`;

const StyledText = styled.Text`
  line-height: 18px;
  font-size: 12px;
  color: #4b5563;
  font-weight: 700;
  text-align: center;
`;
