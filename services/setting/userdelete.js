import axios from 'axios';

API_BASE_URL='http://192.168.25.31:4000'

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

/* [Function] 유저 삭제 처리 함수 */
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