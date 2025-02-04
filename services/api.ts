import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginData, RegisterData } from '@/app/lib/definitions';
import { Platform } from 'react-native';
import { router } from 'expo-router';

const getBaseUrl = () => {
  if (__DEV__) {
    // In sviluppo
    if (Platform.OS === 'web') {
      return 'http://127.0.0.1:8000/api';
    } else {
      return 'http://192.168.1.75:8000/api';  
    }
  } else {
    // In produzione
    return 'https://tuodominio.com/api';
  }
};
const API_BASE_URL = getBaseUrl();
export let accessToken: string | undefined;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add refresh token function
const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
      refresh: refreshToken
    });
    
    if (response.data.access) {
      await AsyncStorage.setItem('accessToken', response.data.access);
      return response.data.access;
    }
    return null;
  } catch (error) {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    router.replace('/login');
    return null;
  }
};

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const setAccessToken = async (accessToken: string, refreshTokenValue: string) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshTokenValue);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    console.error('Error setting tokens:', error);
  }
};

export const checkAuthStatus = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    router.replace('/login');
  }
  return token;
};

export const loadStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token, '');
    }
  } catch (error) {
    console.error('Error loading token:', error);
  }
};



export const apiService = {
  get: <T>(endpoint: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(endpoint, { ...config, params }),

  post: <T, U = unknown>(
    endpoint: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.post<T>(endpoint, data, config),

  put: <T, U = unknown>(
    endpoint: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.put<T>(endpoint, data, config),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete<T>(endpoint, config),
};

export const authService = {
    register: (data: RegisterData): Promise<AxiosResponse<AuthResponse>> =>
      apiClient.post('/register/', data).then(response => {
        return response;
      }).catch(error => {
        return error;
      }),
    login: async (data: LoginData)  => {
      try {
        const response = await apiClient.post<AuthResponse>('/login/', data);
        if (response.data?.access) {
          await AsyncStorage.setItem('accessToken', response.data.access);

        }
        return response;
      } catch (error) {
        console.error('Login error:', error);
        return error;
      }
    },
    refreshToken: (token: string): Promise<AxiosResponse<{ access: string }>> =>
      apiClient.post('/refresh/', { refresh: token }),
  };