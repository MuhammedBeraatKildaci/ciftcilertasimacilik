export type ShipmentStatus = 'Beklemede' | 'Onaylandı' | 'Yolda' | 'Teslim Edildi' | 'İptal';

export interface Location {
  address: string;
  coordinates: [number, number]; // [latitude, longitude]
}

export interface Shipment {
  _id: string;
  shipmentNumber: string;
  pickup: Location & { date: string };
  delivery: Location & { 
    expectedDate: string;
    actualDate?: string;
  };
  cargo: {
    type: string;
    weight: number;
    volume: number;
    description: string;
  };
  price: {
    amount: number;
    currency: 'TRY' | 'USD' | 'EUR';
  };
  status: ShipmentStatus;
  driver?: string;
  vehicle?: string;
  createdAt: string;
  updatedAt: string;
}

export type DriverStatus = 'Müsait' | 'Görevde' | 'İzinli' | 'Hasta';

export interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseType: 'B' | 'C' | 'D' | 'E';
  phoneNumber: string;
  status: DriverStatus;
  currentLocation?: {
    coordinates: [number, number];
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type VehicleStatus = 'Müsait' | 'Yolda' | 'Bakımda' | 'Arızalı';

export const VEHICLE_TYPES = ['Kamyon', 'Tır', 'Kamyonet', 'Panel Van'] as const;
export type VehicleType = typeof VEHICLE_TYPES[number];

export interface Vehicle {
  _id: string;
  plateNumber: string;
  vehicleType: VehicleType;
  capacity: {
    weight: number;
    volume: number;
  };
  status: VehicleStatus;
  currentDriver?: string;
  lastMaintenance?: {
    date: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
} 