import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginData, RegisterData } from '@/app/lib/definitions';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
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

export const setAccessToken = async (value: string) => {
  try {
    apiClient.interceptors.request.use(
      async (config) => {
        if (value) {
          config.headers.Authorization = `Bearer ${value}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const loadStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
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