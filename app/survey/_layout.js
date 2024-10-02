import { icons } from "../../constants"; 
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export function SurveyLayout() {
  const router = useRouter();

  // 뒤로 가기 버튼 UI 
  const renderBackButton = () => (
    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
      <Image source={icons.arrow_back}/>
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        title: "Back",
        headerTitleStyle: { fontSize: 20},
        headerLeft: renderBackButton,
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
  }
});

export default SurveyLayout