import axios from 'axios';

API_BASE_URL='http://192.168.0.9:4000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* [Function] 유저 Walking 데이터 조회 함수 */
export const Inquiry_stepHistory = async (user_id) => {
  try {
    const response = await api.post(`/User/stepHistory`, { user_id }); 
    return response.data;
  } catch (error) {
    console.error('Error fetching step history:', error);
    throw error;
  }
};
