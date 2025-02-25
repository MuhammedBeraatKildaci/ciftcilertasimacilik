import { Shipment, Driver, Vehicle, LoginCredentials, AuthResponse, APIResponse } from '../types';
import { mockShipments, mockDrivers, mockVehicles, mockUsers } from './mockData';

// Gecikme simülasyonu
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API yanıtı oluşturucu
const createResponse = <T>(data: T): APIResponse<T> => ({
  success: true,
  data,
});

export const mockApi = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      await delay(500);
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password') {
        return {
          token: 'mock-jwt-token',
          user,
        };
      }
      throw new Error('Invalid credentials');
    },
  },

  shipments: {
    getAll: async (search?: string): Promise<Shipment[]> => {
      await delay(500);
      if (search) {
        return mockShipments.filter(s => 
          s.shipmentNumber.toLowerCase().includes(search.toLowerCase()) ||
          s.pickup.address.toLowerCase().includes(search.toLowerCase()) ||
          s.delivery.address.toLowerCase().includes(search.toLowerCase())
        );
      }
      return mockShipments;
    },

    create: async (data: Partial<Shipment>): Promise<Shipment> => {
      await delay(500);
      const newShipment: Shipment = {
        _id: Math.random().toString(36).substr(2, 9),
        shipmentNumber: `SHP${String(mockShipments.length + 1).padStart(5, '0')}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Shipment;
      mockShipments.push(newShipment);
      return newShipment;
    },
  },

  drivers: {
    getAll: async (): Promise<Driver[]> => {
      await delay(500);
      return mockDrivers;
    },

    create: async (data: Partial<Driver>): Promise<Driver> => {
      await delay(500);
      const newDriver: Driver = {
        _id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Driver;
      mockDrivers.push(newDriver);
      return newDriver;
    },
  },

  vehicles: {
    getAll: async (): Promise<Vehicle[]> => {
      await delay(500);
      return mockVehicles;
    },

    create: async (data: Partial<Vehicle>): Promise<Vehicle> => {
      await delay(500);
      const newVehicle: Vehicle = {
        _id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Vehicle;
      mockVehicles.push(newVehicle);
      return newVehicle;
    },
  },
}; 