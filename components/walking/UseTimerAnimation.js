import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useTimerAnimation = (maxPosition = 2500) => {
  const [seconds, setSeconds] = useState(0)
  const [isStop, setIsStop] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let interval = null;

    if (isActive && !isStop) {
      // Timer Start
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        animation.setValue(0);  
        Animated.timing(animation, {
          toValue: maxPosition,
          duration: 10000,  
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();  
      }, 1000);  // seconde restart
    } else {
      clearInterval(interval);
      animation.stopAnimation();
    }

    return () => clearInterval(interval);
  }, [isActive, isStop, animation]);

  // Time Formating
  const formatTime = () => {
    const secs = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    isActive,
    setIsActive,
    isStop,
    setIsStop,
    animation,
    formatTime,
    Timerreset: () => {
      setSeconds(0);
      setIsActive(false);
      setIsStop(false);
      animation.setValue(0);
    }
  };
};
