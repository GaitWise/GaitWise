import * as React from 'react';
import { icons } from '@/constants';
import Iconbox from '@/components/home/Box';
import styled from 'styled-components/native';
import { Banner } from '@/components';
import { ScrollView } from 'react-native';
import { COLORS } from '../../../constants';


const stepsData = [
  { date: '2024년 10월 22일', steps: '2000걸음/5min' },
  { date: '2024년 10月 15日', steps: '3000걸음/5min' },
  { date: '2024年 10月 2日', steps: '3100걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
  { date: '2024年 9月 20日', steps: '2800걸음/5min' },
];

const iconData = [
  {
    text: '予約1',
    innerImageSource: icons.female,
    backgroundColor: COLORS.tomato,
  },
  {
    text: '予約2',
    innerImageSource: icons.male,
    backgroundColor: COLORS.sky_blue,
  },
  {
    text: '予約3',
    innerImageSource: icons.male,
    backgroundColor: COLORS.lime_green,
  },
  {
    text: '予約4',
    innerImageSource: icons.female,
    backgroundColor: COLORS.tomato,
  },
  {
    text: '予約5',
    innerImageSource: icons.male,
    backgroundColor: COLORS.sky_blue,
  },
  {
    text: '予約6',
    innerImageSource: icons.male,
    backgroundColor: COLORS.tomato,
  },
  {
    text: '予約6',
    innerImageSource: icons.male,
    backgroundColor: COLORS.sky_blue,
  },
  {
    text: '予約6',
    innerImageSource: icons.male,
    backgroundColor: COLORS.lime_green,
  },
];

const HomePage = () => {
  return (
    <HomePageWrapper>
      <Content>
        {/* notification */}
        <TopSection />

        {/* banner */}
        <BannerWrapper>
          <Banner />
        </BannerWrapper>
        {/* 기능 */}
        <MiddleContainer>
          <TitleRow>
            <TitleText>{`기능 `}</TitleText>
            <SeeAllText>See All</SeeAllText>
          </TitleRow>
          <CategoriesContainer>
            <GridContainer>
              {iconData.map((item, index) => (
                <Iconbox
                  key={index}
                  text={item.text}
                  innerImageSource={item.innerImageSource}
                  backgroundColor={item.backgroundColor}
                />
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
                    <TextWrapper>
                      <CardTitle>{item.date}</CardTitle>
                    </TextWrapper>
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
  gap: 16px;
`;

const TopSection = styled.View`
  align-items: center;
  gap: 14px;
`;

const BannerWrapper = styled.View`
  align-items: center;
  width: 100%;
`;

const MiddleContainer = styled.View`
  gap: 10px;
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
  flex: 1; /* ScrollViewが有効になるようにflexを追加 */
  align-self: stretch;
  gap: 16px;
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

const TextWrapper = styled.View``;

const CardTitle = styled.Text`
  font-family: Inter-Bold;
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
  font-family: Inter-Regular;
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
  font-family: Inter-Bold;
  font-weight: 700;
`;

const SeeAllText = styled.Text`
  font-size: 14px;
  line-height: 21px;
  color: ${COLORS.slate_gray};
  font-family: Inter-Medium;
  font-weight: 500;
`;

export default HomePage;
