import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Animated, Easing, StyleSheet } from "react-native";
import { icons } from "../../../constants";

const Walking = () => {
  const [seconds, setSeconds] = useState(0);
  const [isStop, setIsStop] = useState(false); 
  const [isActive, setIsActive] = useState(false); 
  const animation = useRef(new Animated.Value(0)).current; 
  
  const maxPosition = 2500;

  // 타이머 작동
  useEffect(() => {
    let interval = null;
    if (isActive && !isStop) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: maxPosition, 
            duration: 10000, 
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      animation.stopAnimation();
    }
    return () => clearInterval(interval);
  }, [isActive, isStop, seconds]);


  // 타이머 계산
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  // Start 버튼 클릭 시
  const handleStart = () => {
    setIsActive(true);
    setIsStop(false);
  };

  // Stop 버튼 클릭 시
  const handleStop = () => {
    animation.stopAnimation();
    setIsStop(true);
  };

  // Reset 버튼 클릭 시
  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
    setIsStop(false);
    animation.setValue(0); 
  };

  // Resume 버튼 클릭 시
  const handleResume = () => {
    setIsStop(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{isActive ? 'Recording...' : "Ready to walk"}</Text>
      <Text style={styles.timerText}>{formatTime()}</Text>

      <View style={styles.iconContainer}>
        <Animated.Image
          style={[styles.runningIcon, { transform: [{ translateX: animation }] }]}
          source={icons.walking_people}
        />
        <Image style={styles.lineIcon} source={icons.walking_line} />
      </View>

      {!isActive && (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.ButtonText}>Start</Text>
        </TouchableOpacity>
      )}
      
      {isActive && !isStop && (
      <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.ButtonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
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

        <TouchableOpacity style={[styles.saveButton]} onPress={() => console.log("Save")}>
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
    position: 'absolute',
    top: 65
  },
  
});

export default Walking;
