import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { apiService, loadStoredToken } from '../services/api';

export const useCRUD = <T extends { id: number }>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get<T[]>(endpoint);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };


  const createItem = async (item: Partial<T>) => {
    try {
      const response = await apiService.post<T, Partial<T>>(endpoint, item);
      setData((prev) => [...prev, response.data]);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    }
  };

  const updateItem = async (id: number, updatedItem: Partial<T>) => {
    try {
      await apiService.put<T, Partial<T>>(`${endpoint}/${id}/`, updatedItem);
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await apiService.delete<T>(`${endpoint}/${id}/`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    }
  };

  useEffect(() => {
    loadStoredToken()
    fetchData();
  }, [endpoint]);

  return { data, loading, error, createItem, updateItem, deleteItem };
};
