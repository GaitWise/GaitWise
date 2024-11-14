// /app/(tabs)/home/_layout.js

import * as React from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { COLORS } from '@/constants';
import styled from 'styled-components/native';
import { View } from 'react-native';

export default function HomeLayout() {
  const { projectName, organization, projectId } = useLocalSearchParams();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Section>
        <RowWrapper>
          <CommonText>{`프로젝트: ${projectName || '없음'}`}</CommonText>
          <CommonText>{`조직: ${organization || '없음'}`}</CommonText>
        </RowWrapper>
        <CommonText>{`ID: ${projectId || '없음'}`}</CommonText>
      </Section>
    </Stack>
  );
}

const Section = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 8px;
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
