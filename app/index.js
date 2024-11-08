import React, { useEffect } from "react";
import { Text, View } from "react-native"; // 수정: react-native에서 가져오도록 변경
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/profile"); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
