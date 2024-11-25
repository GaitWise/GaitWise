import axios from 'axios';

const API_BASE_URL = 'http://192.168.25.38:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Survey_inquiry = async (project_id) => {
  console.log(project_id)
  try {
    const response = await api.post('/Survey/custom_survey', {
      project_id,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};