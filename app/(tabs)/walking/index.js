import 'react-native-get-random-values';
import React, {useCallback} from 'react';
import { icons } from "../../../constants";
import { Sensors } from "../../../components/walking/Sensor";
import { insertSensorData} from "../../../components/walking/SQLite";
import { sendDatabaseFile } from "../../../components/walking/api/Senddata";
import { useTimerAnimation } from "../../../components/walking/UseTimerAnimation";
import { Text, View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { chunkData, generateHash } from '../../../components/walking/DataProcessing';
import { sendChunk, compareHash, resendMissingChunks } from '../../../components/walking/api/Senddata';

// TODO
// 1. Save 버튼 누를시 초기화.
// 2. 테이블 이름 교체

const Walking = () => {
  // Sensor
  const { subscribeSensors, unsubscribeSensors, sensorLog } = Sensors(25);
  // Timer Animation
  const { seconds, setIsActive, setIsStop, formatTime, animation, Timerreset, isActive, isStop } = useTimerAnimation(2500);
  
  // TODO 추후 UDP 통신 구현
  const handleSendDatabaseFile = useCallback(async () => {
    try {
      // chunkSize는 100000
      const chunkSize = 100000;
      // sensorLog 값을 SHA256 해시값을 변경
      const dataHash = generateHash(sensorLog.current);
      // chunkSize대로 데이터를 청크 단위로 나눔
      const chunks = chunkData(sensorLog.current, chunkSize);
      
      // 1개의 청크 단위로 데이터를 보냄.
      for (let i = 0; i < chunks.length; i++) {
        const result = await sendChunk(chunks[i], i, chunks.length, "123456");
        console.log(`Chunk ${i} upload status:`, result);
      }
      
      // 데이터를 다 보냈으면 서버 데이터 해시값과 클라이언트 데이터 해시값과 비교.
      const compareResult = await compareHash(dataHash, "123456");
      console.log("compareResult: ", compareResult);
      
      // 만약 누락된 청크가 있을시 다시 재전송 요청
      if (compareResult.status === 'incomplete') {
        console.log('Resending missing chunks:', compareResult.missingChunks);
        await resendMissingChunks(compareResult.missingChunks, chunks);
      } else if (compareResult.status === 'match') {
        console.log('Data fully synchronized and verified');
        
        // DB파일 생성 (이떄 디비 파일은 그냥 계속 insert)
        const TableName = "Jiseungmin"; 
        await insertSensorData(sensorLog, TableName);
        // const result = await sendDatabaseFile(TableName); 
        // console.log('Database file sent:', result);
        sensorLog.current = []; // Sensor Array Initialization  
      } else {
        console.error('Data mismatch detected');
      }
  
    } catch (error) {
      console.error('Error during the process:', error);
    }
  }, []);


  // Start Button Click Event
  const handleStart = () => {
    setIsStop(false);
    setIsActive(true);
    subscribeSensors();
  };

  // Stop Button Click Event
  const handleStop = () => {
    setIsStop(true);
    unsubscribeSensors();
    animation.stopAnimation();
  };

  // Reset Button Click Event
  const handleReset = () => {
    Timerreset(); // Timer animation Reset
    setIsStop(false);
    setIsActive(false);
    sensorLog.current = []; // Sensor Array Initialization
    animation.setValue(0); 
  };

  // Resume Button Click Event
  const handleResume = () => {
    setIsStop(false);
    subscribeSensors();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{seconds > 0 ? 'Recording...' : "Ready to walk"}</Text>
      <Text style={styles.timerText}>{formatTime()}</Text>

      <View style={styles.iconContainer}>
        <Animated.View style={{ transform: [{ translateX: animation }] }}>
          <icons.walking_people width={60} height={68} /> 
        </Animated.View>
          <icons.walking_line width={320} height={10} /> 
      </View>

      {!isActive && (
        <TouchableOpacity style={styles.startButton} onPress={handleStart} >
          <Text style={styles.ButtonText}>Start</Text>
        </TouchableOpacity>
      )}
      
      {isActive && !isStop && (
      <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset} pointerEvents="auto">
              <Text style={styles.ButtonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.stopButton} onPress={handleStop} pointerEvents="auto">
              <Text style={styles.ButtonText}>Stop</Text>
            </TouchableOpacity>
      </View>
      )}

      {isActive && isStop && (
        <View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resumeButton} onPress={handleResume}>
              <Text style={styles.ButtonText}>Resume</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.ButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.saveButton]} onPress={() => handleSendDatabaseFile()}>
            <Text style={styles.ButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 54,
    color: '#000'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 50,
    marginTop: 100
  },
  runningIcon: {
    width: 60,
    height: 68
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4C2A86',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width:"90%",
    marginBottom: 20
  },
  ButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#4C2A86',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30
  },
  stopButton: {
    backgroundColor: '#4C2A86',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginLeft: 100
  },
  resumeButton: {
    backgroundColor: '#4C2A86',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginRight: 90
  },
  saveButton: {
    backgroundColor: '#4C2A86',
    paddingVertical: 15,
    paddingHorizontal: 160,
    borderRadius: 30,
    marginTop: 20,
  },
  
});

export default Walking;
