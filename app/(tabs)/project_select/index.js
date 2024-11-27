import * as React from 'react';
import { router } from 'expo-router';
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import { ScrollView, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Participation_project, Inquiry_project} from '@/services/project/projectinquiry';

/* 화면 크기 가져오기 */
const { width, height } = Dimensions.get('window');

/* [Screen] ProjectSelect 페이지 */
const ProjectSelect = () => {
  const [pName, setpName] = React.useState('');
  const [userid, setUserId] = React.useState(null);
  const [codeInput, setCodeInput] = React.useState('');
  const [projectsData, setProjectData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    /* [Function] 사용자의 프로젝트 데이터를 불러오는 함수 */
    const fetchProjects = async () => {
      try {
        // AsyncStorage에서 user_id를 가져옴
        const userData = await AsyncStorage.getItem('finalData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          const userIdFromStorage = parsedData.user; 
          setUserId(parsedData.user);

          // 프로젝트 목록 가져오기
          const response = await Inquiry_project(userIdFromStorage);
          if (response.projects) {
            const formattedProjects = response.projects.map((project) => ({
              project_id: project.id,
              project_name: project.name,
              project_description: project.description,
            }));
            setProjectData(formattedProjects);
          }
        }
      } catch (error) {
        console.error('Error fetching projects or user_id:', error);
      }
    };

    fetchProjects();
  }, []);

  // State 변경 시 디버깅용 로그 출력
  React.useEffect(() => {
    console.log('projectsData changed:', projectsData);
  }, [projectsData]);

  /* [Function] 사용자 프로젝트 참여 함수 */
  const addProject = async () => {
    if (codeInput.trim() !== '' && pName.trim() !== '') {
      try {
        const newProject = await Participation_project( userid, pName, codeInput);

        setProjectData((prevProjectsData) => [
          ...prevProjectsData,
          {
            project_id: newProject.project.id,
            project_name: newProject.project.name,
            project_description: newProject.project.description,
          },
        ]);

        setpName('');
        setCodeInput('');
        setModalVisible(false);
      } catch (error) {
        console.error('Error adding project:', error);
      }
    }
  };

  /* [Function] 특정 프로젝트 선택 시 홈 화면 이동 함수*/
  const navigateToHome = async (projectName, project_id) => {
    if (!project_id) {
      console.error('Error: project_id is undefined');
      return;
    }

    const selectedProject = {
      project_id: project_id,
      project_name: projectName,
    };

    await AsyncStorage.setItem('currentProject', JSON.stringify(selectedProject));

    router.push({
      pathname: 'home',
      params: { projectName },
    });
    console.log(`${projectName} 프로젝트로 이동합니다.`);
  };

  /* UI */
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
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

              <ModalTitle>Enter project</ModalTitle>
              <InputWrraper>
                <StyledTextInput
                  placeholder="Engagement Code."
                  placeholderTextColor={COLORS.slate_gray}
                  value={codeInput}
                  onChangeText={setCodeInput}
                  style={{
                    borderBottomWidth: 2,
                    borderColor: COLORS.slate_gray,
                    marginBottom: 16,
                    width: width * 0.39,
                    height: height * 0.06,
                  }}
                />
                <StyledTextInput
                  placeholder="Project Name."
                  placeholderTextColor={COLORS.slate_gray}
                  value={pName}
                  onChangeText={setpName}
                  style={{
                    borderBottomWidth: 2,
                    borderColor: COLORS.slate_gray,
                    marginBottom: 16,
                    width: width * 0.39,
                    height: height * 0.06,
                  }}
                />
              </InputWrraper>

              <ConfirmButton onPress={addProject}>
                <ConfirmText>Confirm</ConfirmText>
              </ConfirmButton>
            </ModalContent>
          </ModalContainer>
        </Modal>

        <Content>
          <ScrollViewContainer>
            {projectsData.length === 0 ? (
              <NoProjectsText>Please add the project.</NoProjectsText>
            ) : (
              <ScrollView
                contentContainerStyle={{ paddingBottom: 16 }}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
              >
                {projectsData.map((item, index) => (
                  <CardShadowBox key={index}>
                    <CardContent>
                      <TextRow
                        onPress={() =>
                          navigateToHome(item.project_name, item.project_id)
                        }
                      >
                        <TextWrapper>
                          <CardTitle>{item.project_name}</CardTitle>
                          <CardSubtitle>
                            {item.project_description}
                          </CardSubtitle>
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
    </KeyboardAwareScrollView>
  );
};

export default ProjectSelect;

/* styled-components */
const ConfirmText = styled.Text`
  color: ${COLORS.white};
  font-size: ${width * 0.045}px;
  font-weight: bold;
  text-align: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  height: 45px;
  width: 100px;
  border-radius: 15px;
  background-color: ${COLORS.dark_indigo};
  padding: ${height * 0.01}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 5px;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  border: 1px solid ${COLORS.light_mist_grey};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const InputWrraper = styled.View`
  flex-direction: row;
  gap: 10px;
`;

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
  height: ${height * 0.06}px;
  justify-content: right;
  align-items: center;
`;

const HomePageWrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
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
  height: 100%;
  background-color: ${COLORS.white};
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  align-self: stretch;
  height: ${height * 1.0}px;
  weight: ${width * 1.0}px;
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

const TextWrapper = styled.View`
  gap: 5px;
`;

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
  width: ${width * 0.88}px;
  padding: ${height * 0.03}px ${width * 0.06}px;
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