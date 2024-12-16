import axios from 'axios';

API_BASE_URL='http://192.168.25.31:4000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* [Function] 유저가 참여한 프로젝트 Custom Survey 데이터 조회하는 함수 */
export const Survey_inquiry = async (project_id) => {
  console.log(project_id);
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

/* [Function] 유저가 작성한 프로젝트 Custom Survey 데이터를 저장하는 함수 */
export const Survey_save = async (surveyData) => {
  try {
    const response = await api.post('/Survey/survey_save', {
      project: surveyData.project,
      essential_survey: surveyData.essential_survey,
      custom_survey: surveyData.custom_survey,
      participant: surveyData.participant,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving survey data:', error);
    throw error;
  }
};
