import * as React from 'react';
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Modal, TextInput, Button, Dimensions } from 'react-native';
import { Participation_project, Inquiry_project } from '../../../services/project/projectinquiry'; 

const { width, height } = Dimensions.get('window');

const ProjectSelect = () => {
  const [pName, setpName] = React.useState('');
  const [userid, setUserId] = React.useState(null); 
  const [codeInput, setCodeInput] = React.useState('');
  const [stepsData, setStepsData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        // AsyncStorage에서 user_id를 가져옴
        const userData = await AsyncStorage.getItem('finalData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          const userIdFromStorage = parsedData.user; // user_id 가져오기
          setUserId(parsedData.user)
          console.log('Fetched user_id:', userIdFromStorage);
  
          // 프로젝트 목록 가져오기
          console.log('Fetching projects for user_id:', userIdFromStorage);
          const response = await Inquiry_project(userIdFromStorage);
          console.log('Projects response:', response);
          if (response.projects) {
            const formattedProjects = response.projects.map((project) => ({
              project_id: project.id,
              project_name: project.name,
              project_description: project.description, 
            }));
            setStepsData(formattedProjects); 
            console.log("stepsData: id", stepsData)
          }
        }
      } catch (error) {
        console.error('Error fetching projects or user_id:', error);
      }
    };
  
    fetchProjects(); // 컴포넌트가 마운트될 때 한 번만 실행
  }, []);

  React.useEffect(() => {
    console.log('stepsData changed:', stepsData);
  }, [stepsData]);

  // 프로젝트 추가하기
  const addProject = async () => {
    if (codeInput.trim() !== '' && pName.trim() !== '') {
      try {
        const newProject = await Participation_project(userid, pName, codeInput);
        console.log('New project added:', newProject);

        setStepsData((prevStepsData) => [
          ...prevStepsData,
          { 
            project_id: newProject.project.id,
            project_name: newProject.project.name,
            project_description: newProject.project.description,
          },
        ]);
        console.log("stepsData add : ", stepsData)

        setpName('');
        setCodeInput('');
        setModalVisible(false);
      } catch (error) {
        console.error('Error adding project:', error);
      }
    }
  };

  const navigateToHome = async(projectName, project_id) => {
    if (!project_id) {
      console.error("Error: project_id is undefined");
      return;
    }
    
    const selectedProject = {
      project_id: project_id,
      project_name: projectName,
    };
    

    await AsyncStorage.setItem('currentProject', JSON.stringify(selectedProject));
    console.log("selectedProject: ", selectedProject)

    router.push({
      pathname: 'home',
      params: { projectName },
    });
    console.log(`${projectName} 프로젝트로 이동합니다.`);
  };

  return (
    <HomePageWrapper>
      <StatusBarContainer>
        <MainText>Join Your Project</MainText>
        <AddButton onPress={() => setModalVisible(true)}>
          <icons.add />
        </AddButton>
      </StatusBarContainer>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <XButtonWrapper>
              <XButton onPress={() => setModalVisible(false)}>
                <icons.close />
              </XButton>
            </XButtonWrapper>

            <ModalTitle>
              Enter your participation code and project name
            </ModalTitle>

            <TextInput
              placeholder="Engagement Code."
              placeholderTextColor={COLORS.slate_gray}
              value={codeInput}
              onChangeText={setCodeInput}
              style={{
                borderBottomWidth: 2,
                borderColor: COLORS.slate_gray,
                marginBottom: 16,
                width: '100%',
                height: height * 0.04,
              }}
            />
            <TextInput
              placeholder="Project Name."
              placeholderTextColor={COLORS.slate_gray}
              value={pName}
              onChangeText={setpName}
              style={{
                borderBottomWidth: 2,
                borderColor: COLORS.slate_gray,
                marginBottom: 16,
                width: '100%',
                height: height * 0.04,
              }}
            />

            <Button
              title="Confirm"
              onPress={addProject}
              color={COLORS.deep_slate_blue}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Content>
        <ScrollViewContainer>
          {stepsData.length === 0 ? (
            <NoProjectsText>Please add the project.</NoProjectsText>
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 16 }}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
            >
              {stepsData.map((item, index) => (
                <CardShadowBox key={index}>
                  <CardContent>
                    <TextRow onPress={() => navigateToHome(item.project_name, item.project_id)}>
                      <TextWrapper>
                        <CardTitle>{item.project_name}</CardTitle>
                        <CardSubtitle>{item.project_description}</CardSubtitle>
                      </TextWrapper>
                    </TextRow>
                  </CardContent>
                </CardShadowBox>
              ))}
            </ScrollView>
          )}
        </ScrollViewContainer>
      </Content>
    </HomePageWrapper>
  );
};

export default ProjectSelect;

const NoProjectsText = styled.Text`
  font-size: ${height * 0.025}px;
  color: ${COLORS.slate_gray};
  text-align: center;
  margin-top: ${height * 0.1}px;
  font-weight: bold;
`;

const XButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
`;

const XButton = styled.TouchableOpacity`
  width: ${width * 0.08}px;
  height: ${height * 0.04}px;
  justify-content: center;
  align-items: center;
`;

const HomePageWrapper = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
`;

const StatusBarContainer = styled.View`
  margin-top: ${height * 0.03}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${width * 0.05}px;
`;

const MainText = styled.Text`
  font-size: ${height * 0.03}px;
  color: ${COLORS.dark_indigo};
  font-weight: bold;
`;

const AddButton = styled.Pressable`
  padding: ${height * 0.01}px;
`;

const Content = styled.View`
  margin: ${height * 0.02}px ${width * 0.05}px;
  flex: 1;
  background-color: ${COLORS.white};
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  align-self: stretch;
  height: ${height * 0.5}px;
  border-radius: 20px;
`;

const CardShadowBox = styled.View`
  shadow-opacity: 0.2;
  elevation: 4;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  shadow-color: rgba(0, 0, 0, 0.1);
  background-color: ${COLORS.white};
  border-radius: 10px;
  margin: ${height * 0.01}px 0;
`;

const CardContent = styled.View`
  padding: ${height * 0.02}px;
  justify-content: center;
  border-radius: 10px;
  background-color: ${COLORS.dark_indigo};
`;

const TextRow = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.View``;

const CardTitle = styled.Text`
  font-size: ${height * 0.02}px;
  color: ${COLORS.white};
`;

const CardSubtitle = styled.Text`
  font-size: ${height * 0.018}px;
  color: ${COLORS.slate_gray};
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.View`
  width: ${width * 0.85}px;
  padding: ${height * 0.04}px ${width * 0.06}px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: ${height * 0.025}px;
  font-weight: bold;
  margin-bottom: ${height * 0.04}px;
  color: ${COLORS.dark_indigo};
`;
