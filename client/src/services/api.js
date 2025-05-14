import axios from 'axios';

// Create instance of axios with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('sessionId');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (sessionId && !token) {
      config.headers['X-Session-ID'] = sessionId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  createSession: () => api.post('/users/session'),
};

// Prompt API
export const promptAPI = {
  enhancePrompt: (prompt) => api.post('/prompts/enhance', { original: prompt }),
  savePrompt: (promptData) => api.post('/prompts/save', promptData),
  getPrompt: (id) => api.get(`/prompts/${id}`),
  getPublicPrompts: (page = 1, limit = 10) => 
    api.get(`/prompts/public?page=${page}&limit=${limit}`),
  getUserPrompts: (page = 1, limit = 10) => 
    api.get(`/prompts/user/my-prompts?page=${page}&limit=${limit}`),
  updatePrompt: (id, promptData) => api.put(`/prompts/${id}`, promptData),
  deletePrompt: (id) => api.delete(`/prompts/${id}`),
  forkPrompt: (id) => api.post(`/prompts/${id}/fork`),
};

// Interaction API
export const interactionAPI = {
  addComment: (commentData) => api.post('/interactions/comments', commentData),
  getComments: (promptId, page = 1, limit = 10) => 
    api.get(`/interactions/comments/${promptId}?page=${page}&limit=${limit}`),
  likePrompt: (promptId) => api.post(`/interactions/likes/${promptId}`),
  unlikePrompt: (promptId) => api.delete(`/interactions/likes/${promptId}`),
  checkLike: (promptId) => api.get(`/interactions/likes/${promptId}/check`),
  getLikeCount: (promptId) => api.get(`/interactions/likes/${promptId}/count`),
};

export default api;
