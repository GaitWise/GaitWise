import axios from 'axios';

const API_BASE_URL = 'http://192.168.25.38:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Inquiry_User = async (user_id) => {
  try {
    console.log("user_id: ", user_id); 
    const response = await api.get(`/User/inquiryUser`, {
      params: { user_id }, 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
