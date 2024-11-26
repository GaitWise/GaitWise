import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.9:4000'; // 서버 주소 설정

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contact_post = async (title, content, author, email) => {
  console.log(title, content, author, email)
  try {
    const response = await api.post('/Post/savepost', {
      title,
      content,
      author,
      email
    });
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};