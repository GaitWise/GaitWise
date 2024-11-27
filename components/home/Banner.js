import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import { COLORS } from '../../constants';
import { Link } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

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
      url: null, 
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderItem = ({ item }) => {
    const formatTime = `${item.year}-${item.month}-${item.day} ${item.hour}:00:00`;
    const saleStartTime = new Date(formatTime);
    const remainingTime = saleStartTime.getTime() - currentTime.getTime();

    let displayText;
    if (remainingTime > 0) {
      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      displayText = `${days.toString().padStart(2, '0')}:${hours
        .toString()
        .padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      displayText = 'Preparing';
    }

    const isDisabled = !item.url;

    return (
      <CarouselItem key={item.name}>
        {!isDisabled ? (
          <Link href={item.url}>
            <Image
              source={item.data}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <BannerText>{displayText}</BannerText>
          </Link>
        ) : (
          <>
            <Image
              source={item.data}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <BannerText>{displayText}</BannerText>
          </>
        )}
      </CarouselItem>
    );
  };

  return (
    <CarouselContainer>
      <Carousel
        data={bannerList}
        renderItem={renderItem}
        sliderWidth={screenWidth - 48}
        itemWidth={screenWidth - 48}
        autoplay={true}
        loop={true}
        autoplayDelay={3000}
        autoplayInterval={5000}
      />
    </CarouselContainer>
  );
}

// Styled components

const CarouselContainer = styled.View`
`;

const CarouselItem = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${COLORS.white};
`;

const BannerText = styled.Text`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: ${COLORS.white};
`;
