import axios from 'axios';

API_BASE_URL='http://192.168.0.9:8000'

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: { 'Content-Type': 'application/json'},
});

export const gait_report = async (walkingId, height, weight) => {
  try {
    // 객체 구조 확인
    console.log("Full weight object:", JSON.stringify(weight, null, 2));

    // 값 추출
    const weightValue = weight?.value || null; // weight.value가 없으면 null
    const weightType = weight?.type || null;  // weight.type이 없으면 null

    // 유효성 검사
    if (!weightValue || !weightType) {
      throw new Error("Invalid weight data: Missing 'value' or 'type'");
    }

    console.log("weight:", weightValue, weightType);
    console.log("gait:", typeof walkingId, typeof height, typeof weightValue, typeof weightType);

    // API 요청
    const response = await api.post('/smartgait', {
      walkingId,
      height,
      weight: weightValue,
      type: weightType,
    });

    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

