import axios from 'axios';

API_BASE_URL='http:/192.168.25.31:4000'

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

/* [Function] 유저 문의사항 데이터 요청 함수 */
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