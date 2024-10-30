import * as React from 'react';
import styled from 'styled-components/native';
import { useState, useRef } from 'react';
import { TouchableOpacity, FlatList, View, Pressable } from 'react-native';
import { COLORS, icons } from '../../constants';
import { useNavigation } from 'expo-router';

const Weight = () => {
  const navigation = useNavigation();
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('KG'); // 기본 단위로 kG 설정
  const flatListRef = useRef(null);

  const weightArray = Array.from({ length: 201 }, (_, index) => index);

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / 68);
    setSelectedWeight(weightArray[newIndex]);
  };

  const toggleUnit = (unit) => {
    setSelectedUnit(unit); // 선택한 단위를 상태로 설정
  };

  return (
    <BaseFrameContainer>
      <QContainer>
        <QText>What Is Your Weight?</QText>
      </QContainer>
      <KgContainer>
        <TouchableOpacity onPress={() => toggleUnit('KG')}>
          <Text isSelected={selectedUnit === 'KG'}>KG</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => toggleUnit('LB')}>
          <Text isSelected={selectedUnit === 'LB'}>LB</Text>
        </TouchableOpacity>
      </KgContainer>
      <WeightContainer>
        <FlatList
          horizontal
          ref={flatListRef}
          data={weightArray}
          keyExtractor={(item) => item.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScrollEnd}
          snapToInterval={25}
          snapToAlignment="center"
          decelerationRate="normal"
          scrollEnabled={true}
          contentContainerStyle={{ paddingHorizontal: 160 }}
          renderItem={({ item }) => (
            <WeightItem>
              <StyledWeightText isSelected={item === selectedWeight}>
                {item}
              </StyledWeightText>
            </WeightItem>
          )}
          />
      </WeightContainer>
      <LogoImage source={icons.arrow_up} />
      <ResultContainer>
        <WeightText>
          {selectedWeight} {selectedUnit} {/* 선택한 단위 표시 */}
        </WeightText>
      </ResultContainer>
      <ContinueButton onPress={() => navigation.navigate('height')}>
        <ContinueButtonText>Continue</ContinueButtonText>
      </ContinueButton>
    </BaseFrameContainer>
  );
};

export default Weight;

const WeightText = styled.Text`
  font-size: 64px;
  color: ${COLORS.dark_indigo};
  font-family: Poppins-Bold;
  font-weight: 700;
  text-align: center;
`;

const StyledWeightText = styled.Text`
  font-size: ${(props) => (props.isSelected ? '45px' : '30px')};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
  color: ${COLORS.dark_indigo};
  font-family: Poppins-Bold;
  font-weight: 700;
  justify-content: center;
`;

const WeightItem = styled.View`
  width: 68px;
  justify-content: center;
  align-items: center;
`;

const WeightContainer = styled.View`
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  width: 100%;
  height: 150px;
  align-items: center;
`;

const BaseFrameContainer = styled.View`
  background-color: ${COLORS.white};
  flex: 1;
  height: 844px;
  gap: 35px;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

const QContainer = styled.View`
  height: 167px;
  padding-vertical: 50px;
  gap: 35px;
  justify-content: center;
  width: 390px;
  align-items: center;
`;

const QText = styled.Text`
  color: ${COLORS.dark_indigo};
  font-size: 30px;
  font-weight: 700;
`;

const KgContainer = styled.View`
  justify-content: space-between;
  background-color: ${COLORS.soft_blue};
  flex-direction: row;
  align-items: center;
  border-radius: 14px;
  width: 321px;
  padding-vertical: 6px;
`;

const Text = styled.Text`
  width: 144px;
  font-family: 'Poppins-Bold';
  font-weight: 700;
  font-size: 20px;
  text-transform: capitalize;
  text-align: center;
  color: ${COLORS.light_mist_grey};
  height: 31px;
`;

const Divider = styled.View`
  width: 3px;
  background-color: ${COLORS.light_mist_grey};
  overflow: hidden;
  height: 45px;
`;

const LogoImage = styled.Image`
  border-radius: 4px;
  width: 46px;
  height: 32px;
`;

const ResultContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;
`;

const ContinueButton = styled(Pressable)`
  top: 720px;
  left: 106px;
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  border: 1px solid ${COLORS.white};
  width: 179px;
  padding-horizontal: 36px;
  padding-vertical: 10px;
  position: absolute;
  align-items: center;
  overflow: hidden;
`;

const ContinueButtonText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
  text-align: center;
`;

