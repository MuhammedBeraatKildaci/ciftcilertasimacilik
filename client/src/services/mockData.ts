import { Shipment, Driver, Vehicle, User, ShipmentStatus, DriverStatus, VehicleStatus } from '../types';

// Helper fonksiyonlar
const generateId = () => Math.random().toString(36).substr(2, 9);
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// Enum değerlerinden rastgele seçim yapan fonksiyon
function randomEnum<T extends { [key: string]: string }>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj) as T[keyof T][];
  return enumValues[Math.floor(Math.random() * enumValues.length)];
}

// Mock veri
export const mockShipments: Shipment[] = Array(20).fill(null).map((_, index) => ({
  _id: generateId(),
  shipmentNumber: `SHP${String(index + 1).padStart(5, '0')}`,
  pickup: {
    address: `Kaynak Adres ${index + 1}`,
    coordinates: [41 + Math.random(), 29 + Math.random()],
    date: randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).toISOString(),
  },
  delivery: {
    address: `Hedef Adres ${index + 1}`,
    coordinates: [41 + Math.random(), 29 + Math.random()],
    expectedDate: randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).toISOString(),
  },
  cargo: {
    type: `Kargo Tipi ${index + 1}`,
    weight: Math.floor(Math.random() * 1000) + 100,
    volume: Math.floor(Math.random() * 100) + 10,
    description: `Kargo açıklaması ${index + 1}`,
  },
  price: {
    amount: Math.floor(Math.random() * 10000) + 1000,
    currency: 'TRY',
  },
  status: randomEnum({
    PENDING: 'Beklemede',
    APPROVED: 'Onaylandı',
    IN_TRANSIT: 'Yolda',
    DELIVERED: 'Teslim Edildi',
    CANCELLED: 'İptal',
  }) as ShipmentStatus,
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const mockDrivers: Driver[] = Array(10).fill(null).map((_, index) => ({
  _id: generateId(),
  firstName: `Sürücü${index + 1}`,
  lastName: `Soyad${index + 1}`,
  licenseNumber: `LIC${String(index + 1).padStart(5, '0')}`,
  licenseType: ['B', 'C', 'D', 'E'][Math.floor(Math.random() * 4)] as 'B' | 'C' | 'D' | 'E',
  phoneNumber: `+90${Math.floor(Math.random() * 10000000000)}`,
  status: randomEnum({
    AVAILABLE: 'Müsait',
    ON_DUTY: 'Görevde',
    ON_LEAVE: 'İzinli',
    SICK: 'Hasta',
  }) as DriverStatus,
  currentLocation: {
    coordinates: [41 + Math.random(), 29 + Math.random()],
    updatedAt: new Date().toISOString(),
  },
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const mockVehicles: Vehicle[] = Array(15).fill(null).map((_, index) => ({
  _id: generateId(),
  plateNumber: `34${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
  vehicleType: ['Kamyon', 'Tır', 'Kamyonet', 'Panel Van'][Math.floor(Math.random() * 4)] as Vehicle['vehicleType'],
  capacity: {
    weight: Math.floor(Math.random() * 20000) + 5000,
    volume: Math.floor(Math.random() * 100) + 20,
  },
  status: randomEnum({
    AVAILABLE: 'Müsait',
    IN_TRANSIT: 'Yolda',
    MAINTENANCE: 'Bakımda',
    BROKEN: 'Arızalı',
  }) as VehicleStatus,
  lastMaintenance: {
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: `Bakım açıklaması ${index + 1}`,
  },
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const mockUsers: User[] = [
  {
    _id: generateId(),
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    _id: generateId(),
    email: 'user@example.com',
    name: 'Test User',
    role: 'user',
  }
]; 