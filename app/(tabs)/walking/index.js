import 'react-native-get-random-values';
import { icons, COLORS } from '../../../constants';
import React, { useCallback, useState } from 'react';
import { Sensors } from '../../../components/walking/Sensor';
import { insertSensorData } from '../../../components/walking/SQLite';
import { sendDatabaseFile } from '../../../components/walking/api/Senddata';
import { useTimerAnimation } from '../../../components/walking/UseTimerAnimation';
import {
  chunkData,
  generateHash,
} from '../../../components/walking/DataProcessing';
import {
  sendChunk,
  compareHash,
  resendMissingChunks,
} from '../../../components/walking/api/Senddata';
import { ActivityIndicator, Modal, Animated } from 'react-native';
import styled from 'styled-components/native';

// TODO
// 1. Save 버튼 누를시 초기화.

const Walking = () => {
  // 로딩 및 모달 상태 관리
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // 다이얼로그 표시 여부 관리

  // Sensor
  const { subscribeSensors, unsubscribeSensors, sensorLog } = Sensors(25);
  // Timer Animation
  const {
    seconds,
    setIsActive,
    setIsStop,
    formatTime,
    animation,
    Timerreset,
    isActive,
    isStop,
  } = useTimerAnimation(2500);

  // TODO 추후 UDP 통신 구현
  const handleSendDatabaseFile = useCallback(async () => {
    setLoading(true); // 저장 버튼 클릭 시 로딩 시작
    setModalVisible(true); // 모달 표시

    try {
      const chunkSize = 100000;
      const dataHash = generateHash(sensorLog.current);
      const chunks = chunkData(sensorLog.current, chunkSize);

      for (let i = 0; i < chunks.length; i++) {
        const result = await sendChunk(chunks[i], i, chunks.length, '123456');
        console.log(`Chunk ${i} upload status:`, result);
      }

      const compareResult = await compareHash(dataHash, '123456');
      console.log('compareResult: ', compareResult);

      if (compareResult.status === 'incomplete') {
        console.log('Resending missing chunks:', compareResult.missingChunks);
        await resendMissingChunks(compareResult.missingChunks, chunks);
      } else if (compareResult.status === 'match') {
        console.log('Data fully synchronized and verified');

        const TableName = 'Jiseungmin';
        await insertSensorData(sensorLog, TableName);
        sensorLog.current = [];
      } else {
        console.error('Data mismatch detected');
      }
    } catch (error) {
      console.error('Error during the process:', error);
    } finally {
      setLoading(false); // 로딩 중지
      setModalVisible(false); // 모달 닫기
      handleReset(); // 데이터 저장 완료 후 초기화
    }
  }, []);

  const handleStart = () => {
    setIsStop(false);
    setIsActive(true);
    subscribeSensors();
  };

  const handleStop = () => {
    setIsStop(true);
    unsubscribeSensors();
    animation.stopAnimation();
  };

  const handleReset = () => {
    sensorLog.current = [];
    Timerreset();
    setIsStop(false);
    unsubscribeSensors();
    setIsActive(false);
    animation.setValue(0);
  };

  const handleResume = () => {
    setIsStop(false);
    subscribeSensors();
  };

  return (
    <Container>
      <TitleText>{seconds > 0 ? 'Recording...' : 'Ready to walk'}</TitleText>
      <TimerText>{formatTime()}</TimerText>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalText>Saving Data...</ModalText>
            {loading && (
              <ActivityIndicatorContainer>
                <ActivityIndicator size="large" color="#4C2A86" />
              </ActivityIndicatorContainer>
            )}
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <IconContainer>
        <Animated.View style={{ transform: [{ translateX: animation }] }}>
          <icons.walking_people width={60} height={68} />
        </Animated.View>
        <icons.walking_line width={320} height={10} />
      </IconContainer>

      {!isActive && (
        <StartButton onPress={handleStart}>
          <SText>Start</SText>
        </StartButton>
      )}

      {isActive && !isStop && (
        <ButtonRow>
          <ResetButton onPress={handleReset}>
            <ResetText>Reset</ResetText>
          </ResetButton>
          <StopButton onPress={handleStop}>
            <StopText>Stop</StopText>
          </StopButton>
        </ButtonRow>
      )}

      {isActive && isStop && (
        <>
          <ButtonRow>
            <ResumeButton onPress={handleResume}>
              <ResumeText>Resume</ResumeText>
            </ResumeButton>
            <ResetButton onPress={handleReset}>
              <ResetText>Reset</ResetText>
            </ResetButton>
          </ButtonRow>
          <SaveButton onPress={handleSendDatabaseFile}>
            <SText>Save</SText>
          </SaveButton>
        </>
      )}
    </Container>
  );
};

export default Walking;

// styled-components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.white};
`;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 300px;
  padding: 20px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalText = styled.Text`
  font-size: 18px;
  `;

const ActivityIndicatorContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 24px;
  color: ${COLORS.black};
  margin-bottom: 20px;
`;

const TimerText = styled.Text`
  font-size: 54px;
  color: ${COLORS.black};
`;

const IconContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 50px;
  margin-top: 100px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 55px;
`;

const StartButton = styled.TouchableOpacity`
  background-color: #4c2a86;
  border-radius: 30px;
  padding: 15px 40px;
  width: 90%;
  margin-bottom: 20px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;

const SText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const StopText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ResetText = styled.Text`
  color: ${COLORS.soft_blue};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ResumeText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ResetButton = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  padding: 15px 40px;
  border-radius: 30px;
  width: 154px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;

const StopButton = styled.TouchableOpacity`
  background-color: ${COLORS.soft_blue};
  padding: 15px 40px;
  border-radius: 30px;
  width: 154px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;

const ResumeButton = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  padding: 15px 40px;
  border-radius: 30px;
  width: 154px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #4c2a86;
  padding: 15px 160px;
  border-radius: 30px;
  margin-top: 20px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;
