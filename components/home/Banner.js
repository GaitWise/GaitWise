import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Carousel } from '@material-tailwind/react';
import { COLORS } from '../../constants';
import { Link } from 'expo-router';

export default function Banner() {
  const [bannerList, setBannerList] = useState([
    {
      name: 'Banner 1',
      type: 'image',
      size: 500,
      data: require('../../assets/image/healthcare.jpg'),
      year: '2024',
      month: '10',
      day: '15',
      hour: '12',
      url: 'https://example.com/banner1',
    },
    {
      name: 'Banner 2',
      type: 'image',
      size: 500,
      data: require('../../assets/image/BannerTest.png'),
      year: '2024',
      month: '10',
      day: '16',
      hour: '14',
      url: 'https://example.com/banner2',
    },
    {
      name: 'Banner 3',
      type: 'image',
      size: 500,
      data: require('../../assets/image/BannerTest.png'),
      year: '2024',
      month: '10',
      day: '17',
      hour: '16',
      url: null, // URL가 없는 경우
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [adjustedWidth, setAdjustedWidth] = useState(Dimensions.get('window').width - 48);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleResize = () => {
      setAdjustedWidth(Dimensions.get('window').width - 48);
    };

    // Add event listener for dimension change
    Dimensions.addEventListener('change', handleResize);

    return () => {
      clearInterval(timer);
      Dimensions.removeEventListener('change', handleResize); // Clean up listener
    };
  }, []);

  return (
    <StyledCarousel
      autoplay={true}
      loop={true}
      autoplayDelay={3000}
      interval={5000}
    >
      {bannerList.map((content, i) => {
        const formatTime =
          content.year +
          '-' +
          content.month +
          '-' +
          content.day +
          '-' +
          content.hour +
          ':00:00';
        const saleStartTime = new Date(formatTime);
        const remainingTime = saleStartTime.getTime() - currentTime.getTime();

        let displayText;
        if (remainingTime > 0) {
          const seconds = Math.floor((remainingTime / 1000) % 60);
          const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          displayText = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          displayText = 'For Sale';
        }

        const isDisabled = !content.url; // URL가 없는 경우에 무효화

        return (
          <View key={i}>
            {!isDisabled ? (
              <Link href={content.url} target="_blank">
                <ImageContainer>
                  <Image
                    source={content.data}
                    style={{ width: adjustedWidth, height: '100%' }}
                    resizeMode="cover"
                  />
                </ImageContainer>
                <BannerText>{displayText}</BannerText>
              </Link>
            ) : (
              <ImageContainer>
                <Image
                  source={content.data}
                  style={{ width: adjustedWidth, height: '100%' }}
                  resizeMode="cover"
                />
                <BannerText>{displayText}</BannerText>
              </ImageContainer>
            )}
          </View>
        );
      })}
    </StyledCarousel>
  );
}

// Styled components

const ImageContainer = styled.View`
  width: 100%;
  height: 11rem;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.white};
  overflow: hidden;
`;

const StyledCarousel = styled(Carousel)`
  display: flex;
  width: 100%;
  height: 11rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const BannerText = styled.Text`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 2rem;
  font-weight: bold;
  color: ${COLORS.white};
`;
