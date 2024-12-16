import axios from 'axios';

API_BASE_URL='http://100.95.208.8:8000'

const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: { 'Content-Type': 'application/json'},
});

export const gait_report = async (walkingId, height, weight, weight_type) => {
  try {
    const response = await api.post('/smartgait', { walkingId, height, weight, weight_type});
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

