import { icons } from "../../../constants"; 
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function WalkingLayout() {
  const router = useRouter();

  // 뒤로 가기 버튼 UI 
  const renderBackButton = () => (
    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={icons.walking_arrow_back}
      />
    </TouchableOpacity>
  );

  // 분석가와 모니터링 연결 버튼 UI
  const renderConnectButton = () => (
    <TouchableOpacity style={styles.button} onPress={() => console.log("Connect Button")}>
      <Image
        style={styles.connecticon}
        resizeMode="contain"
        source={icons.walking_connect}
      />
    </TouchableOpacity>
  )

  return (
    <Stack
      screenOptions={{
        title: "Walking",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 16},
        headerLeft: renderBackButton,
        headerRight: renderConnectButton
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
  backicon: {
    width: 24,
    height: 16, 
  },
  connecticon: {
    width: 24,
    height: 24, 
  }
});
