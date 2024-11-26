import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.9:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 사용자 데이터 저장
export const saveUserData = async (userData) => {
  try {
    console.log("userData:", userData)
    const response = await api.post('/User/UserDataSave', userData); 
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
