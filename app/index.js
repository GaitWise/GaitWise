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
        const storedData = await AsyncStorage.getItem('userData'); 
        setTimeout(() => {
          if (storedData) {
            router.replace('/project_select'); 
          } else {
            router.replace('/profile'); 
          }
        }, SPLASH_DURATION);
      } catch (error) {
        console.error('Failed to check AsyncStorage:', error);
        router.replace('/profile');
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
