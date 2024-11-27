import 'react-native-get-random-values';
import { DeviceMotion } from 'expo-sensors';
import styled from 'styled-components/native';
import { icons, COLORS } from '../../../constants';
import { useFocusEffect } from '@react-navigation/native';
import { Sensors } from '../../../components/walking/Sensor';
import React, { useCallback, useState, useRef } from 'react';
import { ActivityIndicator, Modal, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertSensorData } from '../../../components/walking/SQLite';
import { sendDatabaseFile } from '../../../components/walking/api/Senddata';
import { useTimerAnimation } from '../../../components/walking/UseTimerAnimation';
import { chunkData, generateHash} from '../../../components/walking/DataProcessing';
import { sendChunk, compareHash, resendMissingChunks,} from '../../../components/walking/api/Senddata';

const Walking = () => {
  const formattedTimeRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [isStartEnabled, setIsStartEnabled] = useState(false);

  // 구독 객체 관리
  const deviceMotionSubscriptionRef = useRef(null);

  // Sensor
  const { subscribeSensors, unsubscribeSensors, sensorLog } = Sensors(25);
  
  // Timer Animation
  const { seconds, setIsActive, setIsStop, formatTime, animation, Timerreset, isActive, isStop} = useTimerAnimation(2500);

  /* [Function] 디바이스 모션 감지 함수 */
  const subscribeToDeviceMotion = () => {
    DeviceMotion.setUpdateInterval(1000);

    const subscription = DeviceMotion.addListener((data) => {
      const { orientation } = data;
      const { beta } = data.rotation;

      const isFacingForward = beta > -0.3 && beta < 0.3;
      const isTiltedRight = orientation === -90;

      if (isFacingForward && isTiltedRight) {
        setIsStartEnabled(true);
        console.log('핸드폰이 올바른 방향으로 오른쪽으로 기울어져 있습니다.');
      } else if (!isFacingForward) {
        setIsStartEnabled(false);
        console.log('핸드폰의 앞면을 앞으로 향하게 하세요.');
      } else {
        console.log('핸드폰을 오른쪽으로 기울여주세요.');
      }
    });

    deviceMotionSubscriptionRef.current = subscription;
  };

  /* 화면 진입 시 디바이스 모션 구독 및 나가기 시 해제 */
  useFocusEffect(
    React.useCallback(() => {
      subscribeToDeviceMotion(); 
      return () => {
        deviceMotionSubscriptionRef.current?.remove(); // 화면에서 나갈 때 구독 해제
        deviceMotionSubscriptionRef.current = null; // 메모리 정리
        console.log("Device Motion subscription removed.");
      };
    }, [])
  );
  
  // TODO 추후 UDP 통신 구현
  /* [Function] 센서 데이터 서버로 전송 함수 */
  const handleSendDatabaseFile = useCallback(async () => {
    setLoading(true); 
    setModalVisible(true);

    try {
      const userData = await AsyncStorage.getItem('finalData');
      const parsedUserData = JSON.parse(userData);

      const chunkSize = 100000;
      const dataHash = generateHash(sensorLog.current);
      const chunks = chunkData(sensorLog.current, chunkSize);

      // 데이터 청크 전송
      for (let i = 0; i < chunks.length; i++) {
        const result = await sendChunk(chunks[i], i, chunks.length, parsedUserData.user);
        console.log(`Chunk ${i} upload status:`, result);
      }

      // 데이터 동기화 확인
      const compareResult = await compareHash(dataHash, parsedUserData.user, formattedTimeRef.current);

      if (compareResult.status === 'incomplete') {
        console.log('Resending missing chunks:', compareResult.missingChunks);
        await resendMissingChunks(compareResult.missingChunks, chunks);
      } else if (compareResult.status === 'match') {
        console.log('Data fully synchronized and verified');

        await insertSensorData(sensorLog, parsedUserData.user);
        console.log("sensorLog: ", sensorLog)
        sensorLog.current = [];
      } else {
        console.error('Data mismatch detected');
      }
    } catch (error) {
      console.error('Error during the process:', error);
    } finally {
      setLoading(false); 
      setModalVisible(false);
      handleReset(); 
    }
  }, []);

  /* [Function] 측정 시작 버튼 함수 */
  const handleStart = () => {
    setIsStop(false);
    setIsActive(true);
    subscribeSensors();
    deviceMotionSubscriptionRef.current?.remove();
  };

  /* [Function] 측정 중지 버튼 함수 */
  const handleStop = () => {
    setIsStop(true);
    unsubscribeSensors();
    animation.stopAnimation();
    formattedTimeRef.current = formatTime(); 
  };

  /* [Function] 측정 초기화 버튼 함수 */
  const handleReset = () => {
    sensorLog.current = [];
    Timerreset();
    setIsStop(false);
    unsubscribeSensors();
    setIsActive(false);
    animation.setValue(0);
    subscribeToDeviceMotion();
  };

  /* [Function] 측정 재시작 버튼 함수 */
  const handleResume = () => {
    setIsStop(false);
    subscribeSensors();
  };
  
  /* UI */
  return (
    <Container>
      <TitleText>{seconds > 0 ? 'Recording...' : 'Turn left and start walking'}</TitleText>
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
        <StartButton onPress={handleStart} disabled={!isStartEnabled} isEnable={isStartEnabled}>
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

/* styled-components */
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
  background-color: ${({ isEnable }) => (isEnable ? `${COLORS.soft_blue}` : 'gray')};
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
  background-color: ${COLORS.soft_blue};
  padding: 15px 160px;
  border-radius: 30px;
  margin-top: 20px;
  shadow-color: ${COLORS.black};
  shadow-opacity: 0.4;
  shadow-radius: 5px;
  shadow-offset: 0px 3px;
`;