import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api', // This will proxy to localhost:8082/api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Remove Content-Type header for FormData to let axios handle it automatically
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (username, email, password) => 
    api.post('/auth/register', { username, email, password }),
  
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
};

// Profile API calls
export const profileAPI = {
  getCurrentProfile: () => 
    api.get('/profile'),
  
  getProfileByUsername: (username) => 
    api.get(`/profile/user/${username}`),
  
  createOrUpdateProfile: (profileData) => 
    api.post('/profile', profileData),
  
  updateProfile: (profileData) => 
    api.put('/profile', profileData),
  
  updateSelectedTemplate: (selectedTemplate) =>
    api.put('/profile/template', { selectedTemplate }),
  
  deleteProfile: () => 
    api.delete('/profile'),
};

// File Upload API calls
export const fileUploadAPI = {
  // Profile photo
  uploadProfilePhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/profile-photo', formData);
  },

  // Medical portfolio photos
  uploadCertificationPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/certification-photo', formData);
  },

  uploadEducationPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/education-photo', formData);
  },

  uploadInternshipPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/internship-photo', formData);
  },

  uploadProjectPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/project-photo', formData);
  },

  uploadPublicationPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/publication-photo', formData);
  },

  uploadConferencePhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/conference-photo', formData);
  },

  uploadAchievementPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/achievement-photo', formData);
  },

  uploadMedicalExperiencePhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/medical-experience-photo', formData);
  },

  uploadEngineeringExperiencePhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/engineering-experience-photo', formData);
  },

  // Generic file upload
  uploadFile: (file, path) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/files/upload/${path}`, formData);
  },

  // Delete file
  deleteFile: (fileUrl) => 
    api.delete('/files/delete', { params: { fileUrl } }),

  // Get storage info
  getStorageInfo: () => 
    api.get('/files/storage/info'),
};

export default api;
