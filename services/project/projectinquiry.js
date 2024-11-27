import axios from 'axios';

const API_BASE_URL = 'http://192.168.25.38:4000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Participation_project = async (
  user_id,
  project_name,
  project_code,
) => {
  console.log(user_id, project_name, project_code);
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

export const Inquiry_project = async (user_id) => {
  try {
    console.log('user_id: ', user_id);
    const response = await api.get(`/Project/inquiry_project`, {
      params: { user_id },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
