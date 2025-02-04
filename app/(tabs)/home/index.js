import * as React from 'react';
import { Banner } from '@/components';
import { useRouter } from 'expo-router';
import { icons, COLORS } from '@/constants';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Inquiry_stepHistory } from '../../../services/home/stephistory';

/* [Screen] HomePage */
const HomePage = () => {
  const router = useRouter();
  const [stepsData, setStepsData] = React.useState([]);
  const [isSurveyCompleted, setIsSurveyCompleted] = React.useState(true);

  /* [Function] Walking History 데이터를 서버에서 가져오는 함수 */
  const fetchStepHistory = async () => {
    try {
      const userData = await AsyncStorage.getItem('finalData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        const user_id = parsedData.user;
        const stepHistory = await Inquiry_stepHistory(user_id);
        console.log("parsedData: ", parsedData)

        // 데이터 포맷팅
        const formattedData = stepHistory.map((item) => ({
          id: item._id, 
          date: `${new Date(item.createdAt).getFullYear()}Y ${new Date(item.createdAt).getMonth() + 1}M ${new Date(item.createdAt).getDate()}D`,
          steps: `${item.step_count}Steps/${item.walking_time}`,
        }));

        setStepsData(formattedData);
      } else {
        console.error('No user data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error fetching step history:', error);
    }
  };

  /* 화면이 포커스를 얻을 때 스텝 히스토리를 가져옴 */
  useFocusEffect(
    React.useCallback(() => {
      fetchStepHistory();
    }, []),
  );

  /* [Function] 화면 전환 처리 함수 */
  const handlePress = async (route) => {
    try {
      const storedData = await AsyncStorage.getItem('currentProject');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // 설문 페이지로 이동할 때만 project_id를 전달
        if (route === '/survey/selection') {
          if (!parsedData.project_id) {
            Alert.alert(
              'Error',
              'No project selected. Please select a project first.',
            );
            return;
          }

          if (!isSurveyCompleted) {
            Alert.alert(
              'Required survey not completed',
              'Please complete the required survey.',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    router.push({
                      pathname: route,
                      params: { projectId: parsedData.project_id }, 
                    }),
                },
              ],
            );
            return;
          }

          router.push({
            pathname: route,
            params: { projectId: parsedData.project_id },
          });
        } else {
          router.push(route);
        }
      } else {
        Alert.alert(
          'Error',
          'No project selected. Please select a project first.',
        );
      }
    } catch (error) {
      console.error('Error fetching current project:', error);
      Alert.alert('Error', 'Failed to fetch current project.');
    }
  };
  
  /* UI */
  return (
    <HomePageWrapper>
      <Content>
        <Banner />
        <MiddleContainer>
          <TitleRow>
            <TitleText>{`Features`}</TitleText>
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
            <TitleText>{`Recent measurement results`}</TitleText>
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
                <Pressable
                  onPress={() =>
                    Alert.alert(
                      "Report Confirmation", 
                      "Do you want to receive the result report?", 
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Yes",
                          onPress: async () => {
                            try {
                              const userData = await AsyncStorage.getItem("finalData");
                              if (userData) {
                                const parsedData = JSON.parse(userData);
                                router.push({
                                  pathname: "/report",
                                  params: {
                                    walkingId: item.id, 
                                    height: parsedData.height, 
                                    weight: parsedData.weight.value,
                                    weight_type: parsedData.weight.type
                                  },
                                });
                              }
                            } catch (error) {
                              console.error("Error fetching user data:", error);
                              Alert.alert("Error", "Failed to fetch user data.");
                            }
                          },
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                    <TextRow>
                      <CardTitle>{item.date}</CardTitle>
                      <StepWrapper>
                        <StyledImage source={icons.steps} />
                        <StepsText>{item.steps}</StepsText>
                      </StepWrapper>
                    </TextRow>
                  </Pressable>
                </CardContent>
              </CardShadowBox>
            ))}
          </ScrollView>
        </ScrollViewContainer>
      </Content>
    </HomePageWrapper>
  );
};

/* styled-components */
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
  marginTop: 5px;
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

/* 아이콘 데이터 */
const iconData = [
  {
    text: 'Walking',
    IconComponent: icons.walking_people,
    backgroundColor: COLORS.deep_maroon,
    route: '/walking',
  },
  {
    text: 'Survey',
    IconComponent: icons.survey,
    backgroundColor: COLORS.lavender_blush,
    route: '/survey/selection',
  },
  {
    text: 'Project',
    IconComponent: icons.project,
    backgroundColor: COLORS.rose_quartz,
    route: '/project_select',
  },
  {
    text: 'Setting',
    IconComponent: icons.settings,
    backgroundColor: COLORS.peach_puff,
    route: '/setting',
  },
  {
    text: 'Preparing',
    IconComponent: icons.reset,
    backgroundColor: COLORS.cosmic_purple,
    route: '/home',
  },
  {
    text: 'Preparing',
    IconComponent: icons.reset,
    backgroundColor: COLORS.teal_waters,
    route: '/home',
  },
  {
    text: 'Preparing',
    IconComponent: icons.reset,
    backgroundColor: COLORS.arctic_ice,
    route: '/home',
  },
  {
    text: 'Preparing',
    IconComponent: icons.reset,
    backgroundColor: COLORS.vintage_peach,
    route: '/home',
  },
];