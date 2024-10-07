import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/survey"); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
}

export default Splash;0
