import React from 'react';
import { COLORS } from '../../../constants';
import styled from 'styled-components/native';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function HomeLayout() {
  const { projectName = 'None'} = useLocalSearchParams();

  return (
    <>
      <Section>
        <RowWrapper>
          <CommonText>{`Project: ${projectName}`}</CommonText>
        </RowWrapper>
      </Section>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

const Section = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background-color: ${COLORS.white};
`;

const RowWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const CommonText = styled.Text`
  font-size: 17px;
  color: ${COLORS.dark_indigo};
  text-align: center;
  font-weight: bold;
`;
