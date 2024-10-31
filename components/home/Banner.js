import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Carousel } from '@material-tailwind/react';

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
      url: null, // URLがない場合
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledCarousel autoplay={true} loop={true}>
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

        const isDisabled = !content.url; // URLがない場合に無効とする

        return (
          <View key={i}>
            {!isDisabled ? (
              <a href={content.url} target="_blank">
                <View>
                  <Image
                    source={content.data}
                    resizeMode="center" // 배너 안 사진 크기 조절 하기 머 옵션값넣고 뭐 넣고 해서 조절
                  />
                </View>
                <BannerText>{displayText}</BannerText>
              </a>
            ) : (
              <View>
                <Image
                  source={content.data}
                  resizeMode="center" // 배너 안 사진 크기 조절 하기 머 옵션값넣고 뭐 넣고 해서 조절
                />
                <BannerText>{displayText}</BannerText>
              </View>
            )}
          </View>
        );
      })}
    </StyledCarousel>
  );
}

// Styled components
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
  color: white;
`;
