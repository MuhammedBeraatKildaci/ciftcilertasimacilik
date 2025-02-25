import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Shipment, Driver, Vehicle, APIResponse, LoginCredentials, AuthResponse } from '../types';
import { QueryClient } from '@tanstack/react-query';
import { mockApi } from './mockApi';

// process.env için type tanımlaması
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
    }
  }
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Önbellek süresi (5 dakika)
const CACHE_TIME = 1000 * 60 * 5;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIME,
      gcTime: CACHE_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Gerçek API hazır olduğunda burayı güncelleyeceğiz
export const authAPI = mockApi.auth;
export const shipmentAPI = mockApi.shipments;
export const driverAPI = mockApi.drivers;
export const vehicleAPI = mockApi.vehicles;

// API hata yönetimi için interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Ağ hatası
      throw new Error('Ağ bağlantısı hatası');
    }

    if (error.response.status === 401) {
      // Token süresi dolmuş
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    throw error;
  }
);

// API önbellek yönetimi
export const prefetchData = async () => {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['shipments'],
      queryFn: () => shipmentAPI.getAll()
    }),
    queryClient.prefetchQuery({
      queryKey: ['drivers'],
      queryFn: () => driverAPI.getAll()
    }),
    queryClient.prefetchQuery({
      queryKey: ['vehicles'],
      queryFn: () => vehicleAPI.getAll()
    }),
  ]);
};

export default api; 