import { Text, View } from 'react-native';
import { useNavigation } from "expo-router";
import { COLORS } from "../../constants";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const weight = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>weight</Text>
      <ContinueButton onPress={() => navigation.navigate('height')}>
        <ContinueText>Continue</ContinueText>
      </ContinueButton>
    </View>
  );
};

export default weight;

const ContinueButton = styled(TouchableOpacity)`
  width: 179px;
  padding: 10px 36px;
  border-radius: 100px;
  background-color: ${COLORS.dark_indigo};
  border-width: 1px;
  border-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const ContinueText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
  font-family: Poppins-Bold;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;