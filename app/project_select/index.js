import * as React from 'react';
import styled from 'styled-components/native';
import {
  Text,
  ScrollView,
  Modal,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '@/constants';
import { router } from 'expo-router';

const ProjectSelect = () => {
  const [modalVisible, setModalVisible] = React.useState(true);
  const [codeInput, setCodeInput] = React.useState('');
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <StatusBarContainer>
        <MainText>Join Your Project</MainText>
        {/* 프로젝트 초대코드 입력 */}
        <AddButton onPress={() => setModalVisible(true)}>
          <PlusText>+</PlusText>
        </AddButton>
      </StatusBarContainer>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
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
                padding: 8,
              }}
            />
            <Button
              title="확인"
              onPress={addProject}
              color={COLORS.deep_slate_blue}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
      {/* 프로젝트 나열 */}
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

// Styled components

const XButtonWrapper = styled.View`
  width: 100%;
  background-color: ${COLORS.white};
  align-items: flex-end;
`;

const XButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.white};
`;

const HomePageWrapper = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
`;

const StatusBarContainer = styled.View`
  margin-top: 51px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px;
`;

const MainText = styled.Text`
  font-size: 25px;
  color: ${COLORS.dark_indigo};
  font-family: 'Poppins-Bold';
  font-weight: bold;
`;

const AddButton = styled.Pressable`
  padding: 8px;
`;

const XText = styled.Text`
  font-size: 40px;
`;

const PlusText = styled.Text`
  font-size: 40px;
  color: ${COLORS.deep_slate_blue};
`;

const Content = styled.View`
  margin: 24px;
  flex: 1;
  background-color: ${COLORS.white};
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  align-self: stretch;
  height: 400px;
  border-radiuus: 20px;
`;

const CardShadowBox = styled.View`
  shadow-opacity: 0.2;
  elevation: 4;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  shadow-color: rgba(0, 0, 0, 0.1);
  background-color: ${COLORS.white};
  border-radius: 10px;
  margin: 8px 0;
`;

const CardContent = styled.View`
  padding: 20px;
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
  font-family: 'Inter-Bold';
  font-size: 16px;
  color: ${COLORS.white};
`;

const CardSubtitle = styled.Text`
  font-size: 14px;
  color: ${COLORS.slate_gray};
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.View`
  width: 80%;
  padding: 24px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${COLORS.dark_indigo};
`;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  margin-bottom: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: ${COLORS.black};
  font-family: 'Inter-Bold';
  font-weight: bold;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: 179px;
  padding: 10px 36px;
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  border-width: 1px;
  border-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
  font-family: Poppins-Bold;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;
