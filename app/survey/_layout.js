import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";

const SurveyLayout = () => {
  const router = useRouter();

  // 뒤로 가기 버튼 UI
  const renderBackButton = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
    ></TouchableOpacity>
  );

  // // 분석가와 모니터링 연결 버튼 UI
  // const renderConnectButton = () => (
  //   <TouchableOpacity
  //     style={styles.button}
  //     onPress={() => console.log("Connect Button")}
  //   ></TouchableOpacity>
  // );
  return (
    <Stack
      screenOptions={{
        title: "Walking",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 16 },
        headerLeft: renderBackButton,
        // headerRight: renderConnectButton,
      }}
    />
  );
};

export default SurveyLayout;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backicon: {
    width: 24,
    height: 16,
  },
  connecticon: {
    width: 24,
    height: 24,
  },
});
