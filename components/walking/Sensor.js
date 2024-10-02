import React, { useState, useEffect, useRef } from 'react';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';

export const Sensors = (updateInterval = 25) => {
    const sensorLogRef = useRef([]); 
    const accDataRef = useRef({ x: 0, y: 0, z: 0 });
    const gyroDataRef = useRef({ x: 0, y: 0, z: 0 });
    const rotationDataRef = useRef({ alpha: 0, beta: 0, gamma: 0 });

    // Sensor Subscription
    const [accSubscription, setAccSubscription] = useState(null);
    const [gyroSubscription, setGyroSubscription] = useState(null);
    const [rotationSubscription, setRotationSubscription] = useState(null);

    const handleSensorData = () => {
        if (
            (accDataRef.current.x !== 0 || accDataRef.current.y !== 0 || accDataRef.current.z !== 0) ||
            (gyroDataRef.current.x !== 0 || gyroDataRef.current.y !== 0 || gyroDataRef.current.z !== 0) ||
            (rotationDataRef.current.alpha !== 0 || rotationDataRef.current.beta !== 0 || rotationDataRef.current.gamma !== 0)
        ) {
            const newSensorData = {
                timestamp: new Date().toISOString(),
                accData: { ...accDataRef.current },
                gyroData: { ...gyroDataRef.current },
                rotationData: { ...rotationDataRef.current }
            };

            // SensorLog Collect
            sensorLogRef.current.push(newSensorData);
        }
    };

    // Sensor Subscription
    const subscribeSensors = () => {
        Accelerometer.setUpdateInterval(updateInterval);
        Gyroscope.setUpdateInterval(updateInterval);
        DeviceMotion.setUpdateInterval(updateInterval);

        setAccSubscription(
            Accelerometer.addListener((accelerometerData) => {
                accDataRef.current = accelerometerData;
                handleSensorData(); // Sensor Data processing
            })
        );
        setGyroSubscription(
            Gyroscope.addListener((gyroscopeData) => {
                gyroDataRef.current = gyroscopeData;
                handleSensorData(); // Sensor Data processing
            })
        );
        setRotationSubscription(
            DeviceMotion.addListener((motionData) => {
                rotationDataRef.current = motionData.rotation;
                handleSensorData(); // Sensor Data processing
            })
        );
    };

    // Sensor Unsubscription
    const unsubscribeSensors = () => {
        accSubscription && accSubscription.remove();
        gyroSubscription && gyroSubscription.remove();
        rotationSubscription && rotationSubscription.remove();
        setAccSubscription(null);
        setGyroSubscription(null);
        setRotationSubscription(null);
    };

    // Unsubscribe when unmounting a component
    useEffect(() => {
        return () => {
            unsubscribeSensors();
        };
    }, []);

    return { subscribeSensors, unsubscribeSensors, sensorLog: sensorLogRef };
};
