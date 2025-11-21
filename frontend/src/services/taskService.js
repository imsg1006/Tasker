import apiClient from './apiClient';

export const taskService = {
  getTasks: async (status = null, skip = 0, limit = 10) => {
    const response = await apiClient.get('/tasks', {
      params: { status, skip, limit },
    });
    return response.data;
  },

  getTask: async (taskId) => {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await apiClient.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response.data;
  },
};