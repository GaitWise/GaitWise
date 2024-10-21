import 'react-native-get-random-values';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid'
import React, {useCallback} from 'react';
import { icons } from "../../../constants";
import { Sensors } from "../../../components/walking/Sensor";
import { insertSensorData} from "../../../components/walking/SQLite";
import { sendDatabaseFile } from "../../../components/walking/api/Senddata";
import { useTimerAnimation } from "../../../components/walking/UseTimerAnimation";
import { Text, View, TouchableOpacity, Animated, StyleSheet } from "react-native";

// TODO
// 단위 테스트 console ㄲ
// 코드 분리 위에 주석
// 1. Save 버튼 누를시 초기화.
// 2. 테이블 이름 교체

const Walking = () => {
  // Sensor
  const { subscribeSensors, unsubscribeSensors, sensorLog } = Sensors(25);
  // Timer Animation
  const { seconds, setIsActive, setIsStop, formatTime, animation, Timerreset, isActive, isStop } = useTimerAnimation(2500);

  // SQLite DB data Server Send Callback
  const handleSendDatabaseFile = useCallback(async () => {
    try {
      const chunkSize = 100000; // 조각당 전송할 데이터 크기 설정

      const chunkData = (data) => {
        const stringData = JSON.stringify(data)
        const chuncks = []
        for (let i = 0; i < stringData.length; i+= chunkSize){
          chuncks.push(stringData.slice(i, i+chunkSize))
        }
        return chuncks
      }

      const generateHash = (data) => {
        const stringData = JSON.stringify(data);
        const hash = CryptoJS.SHA256(stringData).toString(CryptoJS.enc.Hex);
        return hash;
      };

       // 데이터를 조각별로 서버에 전송하고, 누락된 조각을 다시 전송하는 함수
      const resendMissingChunks = async (missingChunks, chunks) => {
        try {
          for (let i = 0; i < missingChunks.length; i++) {
            const chunkIndex = missingChunks[i]; // 누락된 조각의 인덱스
            const response = await fetch('http://192.168.25.56:4000/sensor-data/upload-chunk', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ chunk: chunks[chunkIndex], index: chunkIndex, totalChunks: chunks.length }),
            });
            const result = await response.json();
            console.log(`Resent chunk ${chunkIndex} status:`, result);
          }
        } catch (error) {
          console.error('Error resending missing chunks:', error);
        }
      };

      const sendDataWithRetry = async () => {
        const chunks = chunkData(sensorLog.current); // 데이터를 조각화
        const dataHash = generateHash(sensorLog.current); // 전체 데이터 해시 값 생성

        try {
          // 모든 조각을 서버에 순차적으로 전송
          for (let i = 0; i < chunks.length; i++) {
            const response = await fetch('http://192.168.25.56:4000/sensor-data/data-chunk', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ chunk: chunks[i], index: i, totalChunks: chunks.length, clientId: "123124" }),
            });

            const result = await response.json();
            console.log(`Chunk ${i} upload status:`, result);
          }

          // 서버에서 조각 검증 후, 누락된 조각 요청
          const compareResponse = await fetch('http://192.168.25.56:4000/sensor-data/compare-hash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ clientHash: dataHash, clientId: "123124" }), // 클라이언트 해시 전송
          });
          const compareResult = await compareResponse.json();
          console.log("compareResult: ", compareResult)
          if (compareResponse.ok && compareResult.status === 'incomplete') {
            console.log('Resending missing chunks:', compareResult.missingChunks);
            await resendMissingChunks(compareResult.missingChunks, chunks); // 누락된 조각 다시 전송
          } else if (compareResponse.ok && compareResult.status === 'match') {
            console.log('Data fully synchronized and verified');
          } else {
            console.error('Data mismatch detected');
          }
          sensorLog.current = []; // Sensor Array Initialization

        } catch (error) {
          console.error('Error sending data to server:', error);
        }
      };

      await sendDataWithRetry()
      console.log("sendDataWithRetry out")


      
      // DB파일 생성 (이떄 디비 파일은 그냥 계속 insert)
      const TableName = "Jiseungmin" // 닉네임으로 변경
      //await insertSensorData(sensorLog, TableName)
      //const result = await sendDatabaseFile(TableName); 
      // console.log('Database file sent:', result);
      sensorLog.current = []; // Sensor Array Initialization
    } catch (error) {
      console.log('Error sending the database file:', error);
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
