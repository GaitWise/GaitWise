import * as React from 'react';
import { Banner } from '@/components';
import { useRouter } from 'expo-router';
import { icons, COLORS } from '@/constants';
import styled from 'styled-components/native';
import { ScrollView, Pressable, Text, Alert } from 'react-native';

const stepsData = [
  { date: '2024년 10월 22일', steps: '2000걸음/5min' },
  { date: '2024년 10월 15일', steps: '3000걸음/5min' },
  { date: '2024년 10월 2일', steps: '3100걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
  { date: '2024년 9월 20일', steps: '2800걸음/5min' },
];

const iconData = [
  {
    text: 'Walking',
    IconComponent: icons.walking_people,
    backgroundColor: COLORS.sky_blue,
    route: '/walking',
  },
  {
    text: 'Survey',
    IconComponent: icons.male,
    backgroundColor: COLORS.sky_blue,
    route: '/comingSoon',
  },
  {
    text: 'Project',
    IconComponent: icons.female,
    backgroundColor: COLORS.sky_blue,
    route: '/project_select',
  },
  {
    text: '준비중',
    IconComponent: icons.male,
    backgroundColor: COLORS.sky_blue,
    route: '/comingSoon',
  },
  {
    text: '준비중',
    IconComponent: icons.male,
    backgroundColor: COLORS.sky_blue,
    route: '/comingSoon',
  },
  {
    text: '준비중',
    IconComponent: icons.male,
    backgroundColor: COLORS.sky_blue,
    route: '/comingSoon',
  },
  {
    text: '준비중',
    IconComponent: icons.male,
    backgroundColor: COLORS.sky_blue,
    route: '/comingSoon',
  },
  {
    text: '준비중',
    IconComponent: icons.male,
    backgroundColor: COLORS.sky_blue,
    route: '/comingSoon',
  },
];

const HomePage = () => {
  // const { projectName, organization, projectId } = useLocalSearchParams();
  const [isSurveyCompleted] = React.useState(false); // 설문 완료 상태 변수
  const router = useRouter();

  // 버튼 클릭 시 필수 설문 완료 여부 확인
  const completeSurvey = () => {
    setIsSurveyCompleted(true); // 설문 완료 상태를 true로 설정
    Alert.alert('설문 완료', '설문이 완료되었습니다!', [
      {
        text: 'OK',
        onPress: () => console.log('Survey completed'), // 필요 시 추가 액션
      },
    ]);
  };

  const handlePress = (route) => {
    if (!isSurveyCompleted) {
      Alert.alert(
        '필수 설문 미완료',
        '필수 설문을 완료해주세요. 설정 페이지의 Edit Survey 버튼을 클릭하세요.',
        [
          {
            text: 'OK',
            onPress: () => router.push('survey/surveyPage'),
          },
        ],
      );
      return;
    }
    router.push(route);
  };

  return (
    <HomePageWrapper>
      <Content>
        {/* <TopSection>
          <RowWrapper>
            <PText>{`프로젝트: ${projectName || '없음'}`}</PText>
            <OText>{`조직: ${organization || '없음'}`}</OText>
          </RowWrapper>
          <IText>{`ID: ${projectId || '없음'}`}</IText>
        </TopSection> */}

        <Banner />

        <MiddleContainer>
          <TitleRow>
            <TitleText>{`기능`}</TitleText>
            <SeeAllText>See All</SeeAllText>
          </TitleRow>
          <CategoriesContainer>
            <GridContainer>
              {iconData.map((item, index) => (
                <StyledPressable
                  key={index}
                  onPress={() => handlePress(item.route)}
                >
                  <ImageContainer
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    <item.IconComponent width={35} height={35} />
                  </ImageContainer>
                  <StyledText>{item.text}</StyledText>
                </StyledPressable>
              ))}
            </GridContainer>
          </CategoriesContainer>
        </MiddleContainer>

        {/* 최근 측정 결과 */}
        <ScrollViewContainer>
          <TitleRow>
            <TitleText>{`최근 측정 결과 `}</TitleText>
            <SeeAllText>See All</SeeAllText>
          </TitleRow>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
          >
            {stepsData.map((item, index) => (
              <CardShadowBox key={index}>
                <CardContent>
                  <TextRow>
                    <CardTitle>{item.date}</CardTitle>
                    <StepWrapper>
                      <StyledImage source={icons.steps} />
                      <StepsText>{item.steps}</StepsText>
                    </StepWrapper>
                  </TextRow>
                </CardContent>
              </CardShadowBox>
            ))}
          </ScrollView>
        </ScrollViewContainer>
      </Content>
    </HomePageWrapper>
  );
};

// Styled components
const HomePageWrapper = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
`;

const Content = styled.View`
  padding: 0 24px;
  flex: 1;
  width: 100%;
  background-color: ${COLORS.white};
  gap: 5px;
`;

const MiddleContainer = styled.View`
  gap: 5px;
  width: 100%;
`;

const CategoriesContainer = styled.View`
  gap: 16px;
  align-self: stretch;
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  align-self: stretch;
  gap: 5px;
  margin-top: -10px;
`;

const CardShadowBox = styled.View`
  shadow-opacity: 1;
  elevation: 2;
  shadow-radius: 2px;
  shadow-offset: 3px 3px;
  shadow-color: rgba(0, 0, 0, 0.05);
  background-color: ${COLORS.white};
  border-radius: 8px;
  align-self: stretch;
`;

const CardContent = styled.View`
  padding: 12px;
  justify-content: center;
  align-self: stretch;
`;

const TextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const CardTitle = styled.Text`
  font-size: 14px;
  line-height: 21px;
  color: ${COLORS.dark_indigo};
  text-align: center;
`;

const StepWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const StyledImage = styled.Image`
  width: 16px;
  height: 16px;
`;

const StepsText = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${COLORS.slate_gray};
`;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

const TitleText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${COLORS.deep_slate_blue};
  font-weight: 700;
`;

const SeeAllText = styled.Text`
  font-size: 14px;
  line-height: 21px;
  color: ${COLORS.slate_gray};
  font-weight: 500;
`;

// Styled Components for Iconbox
const StyledPressable = styled(Pressable)`
  gap: 4px;
  align-items: center;
  width: 23%;
  margin-bottom: 16px;
`;

const ImageContainer = styled.View`
  background-color: ${(props) => props.backgroundColor || '#93c19e'};
  padding: 10px;
  height: 62px;
  width: 62px;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 12px;
  color: #4b5563;
  font-weight: 700;
  text-align: center;
`;

export default HomePage;
