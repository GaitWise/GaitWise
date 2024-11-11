import * as React from 'react';
import { router } from 'expo-router';
import { COLORS } from '@/constants';
import styled from 'styled-components/native';
import { ScrollView, Modal, TextInput, Button, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProjectSelect = () => {
  const [codeInput, setCodeInput] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [stepsData, setStepsData] = React.useState([
    { projectName: '프로젝트A', organization: '조직X' },
    { projectName: '프로젝트B', organization: '조직Y' },
    { projectName: '프로젝트C', organization: '조직Z' },
    { projectName: '프로젝트A', organization: '조직X' },
  ]);

  const addProject = () => {
    if (codeInput.trim() !== '') {
      const newProject = { projectName: codeInput, organization: '조직Z' };
      setStepsData((prevStepsData) => [...prevStepsData, newProject]);
      setCodeInput('');
      setModalVisible(false);
    }
  };

  const navigateToHome = (projectName) => {
    router.push('home');
    console.log(`${projectName} 프로젝트로 이동합니다.`);
  };

  return (
    <HomePageWrapper>
      <StatusBarContainer>
        <MainText>Join Your Project</MainText>
        <AddButton onPress={() => setModalVisible(true)}>
          <PlusText>+</PlusText>
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
                <XText>x</XText>
              </XButton>
            </XButtonWrapper>

            <ModalTitle>참여 코드 입력</ModalTitle>

            <TextInput
              placeholder="참여 코드를 입력하세요"
              value={codeInput}
              onChangeText={setCodeInput}
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.slate_gray,
                marginBottom: 16,
                width: '100%',
              }}
            />

            <Button title="확인" onPress={addProject} color={COLORS.deep_slate_blue} />
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Content>
        <ScrollViewContainer>
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
        </ScrollViewContainer>
      </Content>
    </HomePageWrapper>
  );
};

export default ProjectSelect;


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

const XText = styled.Text`
  font-size: ${height * 0.035}px; 
  color: ${COLORS.dark_indigo};
`;

const PlusText = styled.Text`
  font-size: ${height * 0.04}px;
  color: ${COLORS.deep_slate_blue};
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
  margin-bottom: ${height * 0.02}px;
  color: ${COLORS.dark_indigo};
`;
