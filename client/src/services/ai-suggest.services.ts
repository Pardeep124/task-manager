import api from "../utils/api";

export const getTaskAISuggestions = async (data: { title: string; description: string }) => {
  const response = await api.post('/tasks/ai-suggest', data);
  return response.data;
};