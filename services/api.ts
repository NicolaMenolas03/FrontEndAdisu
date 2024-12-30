import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

interface AuthResponse {
    access: string;
    refresh: string;
  }
  
  interface LoginData {
    username: string;
    password: string;
  }
  
  interface RegisterData {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
  }


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get<T>(endpoint, config),

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
    login: (data: LoginData): Promise<AxiosResponse<AuthResponse>>  =>
      apiClient.post<AuthResponse>('/login/', data).then(response => {
        return response;
      }).catch(error => {
        return error;
      }),
    refreshToken: (token: string): Promise<AxiosResponse<{ access: string }>> =>
      apiClient.post('/refresh/', { refresh: token }),
  };