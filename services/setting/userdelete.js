import axios from 'axios';

const API_BASE_URL = 'http://192.168.25.38:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Delete_User = async (user_id, project_name, project_code) => {
  console.log(user_id, project_name, project_code)
  try {
    const response = await api.post('/Project/participate_project', {
      user_id,
      project_name,
      project_code,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};