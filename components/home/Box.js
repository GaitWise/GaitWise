import React from 'react';
import styled from 'styled-components/native';
import { Image, Pressable } from 'react-native';
import { icons } from '../../constants';

export default function Iconbox({
  text = '기능면',
  innerImageSource,
  backgroundColor = '#93c19e',
}) {
  return (
    <StyledPressable>
      <ImageContainer backgroundColor={backgroundColor}>
        <CircleImage source={icons.circle} resizeMode="cover" />
        <InnerImage source={innerImageSource} resizeMode="cover" />
      </ImageContainer>
      <StyledText>{text}</StyledText>
    </StyledPressable>
  );
}

const StyledPressable = styled(Pressable)`
  gap: 4px;
  align-items: center;
  width: 23%; /* 横4列に並べるための幅 */
  margin-bottom: 16px; /* 下に余白を追加 */
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
  overflow: hidden;
`;

const CircleImage = styled(Image)`
  position: absolute;
  left: -34px;
  top: -34px;
  width: 68px;
  height: 68px;
  z-index: 0;
`;

const InnerImage = styled(Image)`
  height: 31px;
  width: 35px;
  z-index: 1;
`;

const StyledText = styled.Text`
  line-height: 18px;
  font-size: 12px;
  color: #4b5563;
  font-family: 'Inter-Bold';
  font-weight: 700;
  text-align: center;
`;
