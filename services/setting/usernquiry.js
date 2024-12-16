import axios from 'axios';

API_BASE_URL='http://192.168.25.31:4000'

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

/* [Function] 유저 이름 조회 함수 */
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
