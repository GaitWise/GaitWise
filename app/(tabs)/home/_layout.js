import React, { useState } from 'react';
import { COLORS } from '../../../constants';
import styled from 'styled-components/native';
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
            setCurrentProject(parsedData); 
          } else {
            setCurrentProject({ project_name: 'No project selected' }); 
          }
        } catch (error) {
          console.error('Error fetching current project:', error);
        }
      };

      fetchCurrentProject(); 
    }, []),
  );

  return (
    <>
      <Section>
        <ProjectNameText>
          {currentProject ? currentProject.project_name : 'Loading project...'}
        </ProjectNameText>
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
  gap: 5px;
  background-color: ${COLORS.white};
`;

const RowWrapper = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const ProjectText = styled.Text`
  font-size: 15px;
  color: ${COLORS.black};
  font-weight: bold;
  margin-left: 7px; /* 아이콘과 텍스트 간격 */
`;

const ProjectNameText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  margin-bottom: 10px;
  font-style: italic; /* 기울임체 (선택 사항) */
  font-weight: bold;
`;
