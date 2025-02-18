import axios from 'axios';

API_BASE_URL='http://192.168.25.31:4000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* [Function] 유저 데이터 생성 함수 */
export const saveUserData = async (userData) => {
  try {
    console.log('userData:', userData);
    const response = await api.post('/User/UserDataSave', userData);
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
