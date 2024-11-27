import axios from 'axios';

const API_BASE_URL = 'http://192.168.45.63:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Inquiry_stepHistory = async (user_id) => {
  try {
    console.log('user_id: ', user_id);
    const response = await api.post(`/User/stepHistory`, { user_id }); // Send user_id in the request body
    return response.data;
  } catch (error) {
    console.error('Error fetching step history:', error);
    throw error;
  }
};
