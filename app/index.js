import { Video } from 'expo-av';
import { View } from 'react-native';
import { icons } from '@/constants';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SPLASH_DURATION = 3000;

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const checkDataAndNavigate = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData'); // `userData`는 저장된 키
        setTimeout(() => {
          if (storedData) {
            router.replace('/project_select'); // 데이터가 있으면 `project_select`로 이동
          } else {
            router.replace('/profile'); // 데이터가 없으면 `profile`로 이동
          }
        }, SPLASH_DURATION);
      } catch (error) {
        console.error('Failed to check AsyncStorage:', error);
        router.replace('/profile'); // 에러 발생 시 기본적으로 `profile`로 이동
      }
    };

    checkDataAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/video/splash.mp4')}
        style={styles.video}
        resizeMode="contain"
        isLooping
        shouldPlay
      />
      <View style={styles.logoContainer}>
        <icons.logo />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
    transform: [{ scaleX: -1 }],
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
  },
};

export default Splash;
