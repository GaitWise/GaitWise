import styled from 'styled-components/native';
import { icons } from '@/constants';
import { Stack, useRouter } from 'expo-router';

export function SurveyLayout() {
  const router = useRouter();

  // 뒤로 가기 버튼 UI
  const renderBackButton = () => (
    <BackButton onPress={() => router.back()}>
      <icons.arrow_back />
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

export default SurveyLayout;

// styled-components로 스타일 정의
const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
`;
