import * as React from 'react';
import { router } from 'expo-router';
import { COLORS, icons } from '@/constants';
import styled from 'styled-components/native';
import { ScrollView, Modal, TextInput, Button, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProjectSelect = () => {
  const [codeInput, setCodeInput] = React.useState('');
  const [pName, setpName] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [stepsData, setStepsData] = React.useState([]);

  const group = '';

  const addProject = () => {
    // 참여 코드와 프로젝트 이름이 입력되었는지 확인
    if (codeInput.trim() !== '' && pName.trim() !== '') {
      // 새로운 프로젝트 객체에 프로젝트 이름과 조직을 할당
      const newProject = { projectName: pName, organization: group };

      // 기존 프로젝트 데이터에 새 프로젝트 추가
      setStepsData((prevStepsData) => [...prevStepsData, newProject]);

      // 입력 필드 초기화
      setCodeInput('');
      setpName(''); // 추가된 부분: 프로젝트 이름 입력 초기화
      setModalVisible(false);
    }
  };

  const navigateToHome = (projectName, organization, projectId) => {
    router.push({
      pathname: 'home',
      params: { projectName, organization, projectId },
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
                    <TextRow onPress={() => navigateToHome(item.projectName)}>
                      <TextWrapper>
                        <CardTitle>{item.projectName}</CardTitle>
                        <CardSubtitle>{item.organization}</CardSubtitle>
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
