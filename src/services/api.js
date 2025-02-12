const API_URL = 'https://preguntados-api.vercel.app';

export const getDifficulties = async () => {
  const response = await fetch(`${API_URL}/api/difficulty`);
  return response.json();
};

export const getQuestions = async (difficulty = 'easy') => {
  const response = await fetch(`${API_URL}/api/questions?difficulty=${difficulty}`);
  return response.json();
};

export const postAnswer = async (questionId, option) => {
  const response = await fetch(`${API_URL}/api/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ questionId, option })
  });
  const data = await response.json();
  console.log('API response:', data);
  return data;
};
