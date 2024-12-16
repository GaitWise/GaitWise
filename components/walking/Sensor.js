import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accelerometer, Gyroscope, DeviceMotion, Pedometer } from 'expo-sensors';

export const Sensors = (updateInterval = 25, websocketUrl = "ws://192.168.25.31:4000") => {
    const websocketRef = useRef(null);
    const stepCountRef = useRef(0);
    const sensorLogRef = useRef([]);
    const stepCountSubscriptionRef = useRef(null); 
    const accDataRef = useRef({ x: 0, y: 0, z: 0 });
    const gyroDataRef = useRef({ x: 0, y: 0, z: 0 });
    const rotationDataRef = useRef({ alpha: 0, beta: 0, gamma: 0 });
    const [isSensorsActive, setIsSensorsActive] = useState(false);
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
    const [userId, setUserId] = useState("UnknownUser");

    // WebSocket 연결 설정
    const setupWebSocket = () => {
        if (!websocketRef.current || websocketRef.current.readyState === WebSocket.CLOSED) {
            websocketRef.current = new WebSocket(websocketUrl);

            websocketRef.current.onopen = () => {
                console.log("WebSocket connected");
                setIsWebSocketConnected(true);
            };

            websocketRef.current.onclose = () => {
                console.log("WebSocket disconnected");
                setIsWebSocketConnected(false);
            };

            websocketRef.current.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        }
    };

    // WebSocket 연결 해제
    const closeWebSocket = () => {
        if (websocketRef.current) {
            websocketRef.current.close();
            websocketRef.current = null;
            setIsWebSocketConnected(false);
            console.log("WebSocket connection closed explicitly.");
        }
    };

    // WebSocket으로 데이터 전송
    const sendDataToWebSocket = (data) => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.send(JSON.stringify(data));
        }
    };

    // 사용자 데이터 로드
    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('finalData');
            if (userData) {
                const parsedData = JSON.parse(userData);
                const firstName = parsedData.profile?.firstName || 'Unknown';
                const lastName = parsedData.profile?.lastName || '';
                setUserId(`${firstName}${lastName}`.trim());
            } else {
                console.warn("User data not found in AsyncStorage");
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    // Sensor 데이터 처리
    const handleSensorData = () => {
        if (
            (accDataRef.current.x !== 0 || accDataRef.current.y !== 0 || accDataRef.current.z !== 0) ||
            (gyroDataRef.current.x !== 0 || gyroDataRef.current.y !== 0 || gyroDataRef.current.z !== 0) ||
            (rotationDataRef.current.alpha !== 0 || rotationDataRef.current.beta !== 0 || rotationDataRef.current.gamma !== 0)
        ) {
            const newSensorData = {
                user_id: userId,
                timestamp: new Date().toISOString(),
                accData: { ...accDataRef.current },
                gyroData: { ...gyroDataRef.current },
                rotationData: { ...rotationDataRef.current },
                stepCount: stepCountRef.current
            };

            sendDataToWebSocket(newSensorData);
            sensorLogRef.current.push(newSensorData); // SensorLog Collect
        }
    };

    // 센서 구독 시작
    const subscribeSensors = () => {
        setupWebSocket(); // 센서 구독 시작 시 WebSocket 연결
        setIsSensorsActive(true);

        Accelerometer.setUpdateInterval(updateInterval);
        Gyroscope.setUpdateInterval(updateInterval);
        DeviceMotion.setUpdateInterval(updateInterval);

        Accelerometer.addListener((accelerometerData) => {
            accDataRef.current = accelerometerData;
            handleSensorData(); // Sensor Data processing
        });

        Gyroscope.addListener((gyroscopeData) => {
            gyroDataRef.current = gyroscopeData;
            handleSensorData(); // Sensor Data processing
        });

        DeviceMotion.addListener((motionData) => {
            rotationDataRef.current = motionData.rotation || { alpha: 0, beta: 0, gamma: 0 };
            handleSensorData(); // Sensor Data processing
        });

        Pedometer.isAvailableAsync().then((available) => {
            if (available) {
                stepCountSubscriptionRef.current = Pedometer.watchStepCount((result) => {
                    stepCountRef.current = result.steps;
                    handleSensorData(); // Update step count in sensor log
                });
            } else {
                console.warn("Pedometer is not available");
            }
        });
    };

    // 센서 구독 해제
    const unsubscribeSensors = () => {
        Accelerometer.removeAllListeners();
        Gyroscope.removeAllListeners();
        DeviceMotion.removeAllListeners();

        if (stepCountSubscriptionRef.current) {
            stepCountSubscriptionRef.current.remove(); 
            stepCountSubscriptionRef.current = null;
        }

        setIsSensorsActive(false);
        closeWebSocket(); // 센서가 멈출 때 WebSocket 연결 해제
    };

    // 초기화 및 클린업
    useEffect(() => {
        setupWebSocket();
        loadUserData();

        return () => {
            closeWebSocket();
            unsubscribeSensors();
        };
    }, []);

    // 센서 활성화/비활성화에 따라 WebSocket 관리
    useEffect(() => {
        if (isSensorsActive) {
            setupWebSocket();
        } else {
            closeWebSocket();
        }
    }, [isSensorsActive]);

    return { subscribeSensors, unsubscribeSensors, sensorLog: sensorLogRef };
};
