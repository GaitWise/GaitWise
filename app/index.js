import React, { useEffect } from "react";
import { Text, View } from "react-native-web";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/main"); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Splash test</Text>
    </View>
  );
}

export default Splash;
