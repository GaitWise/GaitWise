import React from "react";
import { icons } from '../../constants'
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Layout() {
  const router = useRouter();

  /* [Function] 뒤로 가기 버튼 UI */
  const renderBackButton = () => (
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <icons.walking_arrow_back></icons.walking_arrow_back>
      </TouchableOpacity>
  );

  return (
    <Stack
    screenOptions={{
      title: "Walking Report",
      headerTitleStyle: { fontSize: 16 },
      headerLeft: renderBackButton,
    }}
  />
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
