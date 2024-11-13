import { Video } from "expo-av";
import { View } from "react-native"; 
import { icons } from '@/constants';
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

const SPLASH_DURATION = 3000; 

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/project_select"); 
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/video/splash.mp4")}
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
    justifyContent: "center",
    alignItems: "center",
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
