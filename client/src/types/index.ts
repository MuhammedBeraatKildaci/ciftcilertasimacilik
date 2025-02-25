// Ortak tipler
export type Status = 'Beklemede' | 'Onaylandı' | 'Yolda' | 'Teslim Edildi' | 'İptal';
export type DriverStatus = 'Müsait' | 'Görevde' | 'İzinli' | 'Hasta';
export type VehicleStatus = 'Müsait' | 'Yolda' | 'Bakımda' | 'Arızalı';

// Koordinat tipi
export type Coordinates = [number, number];

// Temel model tipi
interface BaseModel {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Adres bilgisi
interface Location {
  address: string;
  coordinates: Coordinates;
}

// Kargo bilgisi
interface Cargo {
  type: string;
  weight: number;
  volume: number;
  description?: string;
}

// Fiyat bilgisi
interface Price {
  amount: number;
  currency: 'TRY' | 'USD' | 'EUR';
}

// Sevkiyat modeli
export interface Shipment extends BaseModel {
  shipmentNumber: string;
  pickup: Location & { date: string };
  delivery: Location & { 
    expectedDate: string;
    actualDate?: string;
  };
  status: Status;
  cargo: Cargo;
  price: Price;
  driver?: string; // Driver._id
  vehicle?: string; // Vehicle._id
}

// Sürücü modeli
export interface Driver extends BaseModel {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseType: 'B' | 'C' | 'D' | 'E';
  phoneNumber: string;
  status: DriverStatus;
  currentLocation?: Location;
  currentShipment?: string; // Shipment._id
}

// Araç modeli
export interface Vehicle extends BaseModel {
  plateNumber: string;
  vehicleType: string;
  capacity: {
    weight: number;
    volume: number;
  };
  status: VehicleStatus;
  currentDriver?: string; // Driver._id
  lastMaintenance?: {
    date: string;
    description: string;
  };
}

// API yanıt tipleri
export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Auth tipleri
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    role: 'admin' | 'user';
  };
}

// Context tipleri
export interface AuthContextType {
  user: AuthResponse['user'] | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface User {
  _id: string;
  email: string;
  role: 'user' | 'admin';
} 