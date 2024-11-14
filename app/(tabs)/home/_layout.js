import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../../constants';

export default function HomeLayout() {
  const {
    projectName = '없음',
    organization = '없음',
    projectId = '없음',
  } = useLocalSearchParams();

  return (
    <>
      <Section>
        <RowWrapper>
          <CommonText>{`프로젝트: ${projectName}`}</CommonText>
          <CommonText>{`조직: ${organization}`}</CommonText>
        </RowWrapper>
        <CommonText>{`ID: ${projectId}`}</CommonText>
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
  margin-top: 8px;
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
