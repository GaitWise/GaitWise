import { COLORS } from '../../../constants';
import styled from 'styled-components/native';
import React, { useState } from 'react';
import { Stack, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeLayout() {
  const [currentProject, setCurrentProject] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCurrentProject = async () => {
        try {
          const storedData = await AsyncStorage.getItem('currentProject');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('Parsed current project:', parsedData);
            setCurrentProject(parsedData); // 상태에 저장
          } else {
            setCurrentProject({ project_name: 'No project selected' }); // 기본값 설정
          }
        } catch (error) {
          console.error('Error fetching current project:', error);
        }
      };

      fetchCurrentProject(); // 화면에 진입하거나 포커스될 때마다 실행
    }, [])
  );

  return (
    <>
      <Section>
        <RowWrapper>
          <CommonText>
            {currentProject
              ? `Project: ${currentProject.project_name}`
              : 'Loading project...'}
          </CommonText>
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
