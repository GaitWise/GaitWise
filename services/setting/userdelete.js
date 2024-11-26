import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.9:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Delete_User = async (user_id) => {
  console.log("user_id:", user_id)
  try {
    const response = await api.post('/User/deletedUser', {
      user_id
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};