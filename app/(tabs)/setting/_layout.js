import { Stack, useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons'; // 아이콘을 사용하려면 expo-vector-icons에서 import

export default function SettingLayout() {
  const router = useRouter();

  // 뒤로 가기 버튼 UI
  const renderBackButton = () => (
    <BackButton onPress={() => router.back()}>
      <BackbuttonContainer>
        <Ionicons name="arrow-back" size={24} color="black" />
      </BackbuttonContainer>
    </BackButton>
  );

  return (
    <Stack
      screenOptions={{
        title: 'Back',
        headerTitleStyle: { fontSize: 20 },
        headerLeft: renderBackButton,
        headerShadowVisible: false,
      }}
    />
  );
}

// styled-components
const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
`;

const BackbuttonContainer = styled.View``;
