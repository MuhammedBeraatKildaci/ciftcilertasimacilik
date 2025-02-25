export const mockShipments = [
  {
    _id: '1',
    shipmentNumber: 'SHP001',
    pickup: {
      address: 'İstanbul, Kadıköy',
      date: '2024-03-20T10:00:00.000Z',
      coordinates: [41.0082, 28.9784],
    },
    delivery: {
      address: 'Ankara, Çankaya',
      expectedDate: '2024-03-21T14:00:00.000Z',
      coordinates: [39.9334, 32.8597],
    },
    status: 'Beklemede',
    cargo: {
      type: 'Paket',
      weight: 150,
      volume: 2,
    },
    price: {
      amount: 1500,
      currency: 'TRY',
    },
  },
  // Diğer mock sevkiyatlar...
];

export const mockDrivers = [
  {
    _id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    licenseNumber: 'DRV001',
    licenseType: 'B',
    phoneNumber: '5551234567',
    status: 'Müsait',
  },
  // Diğer mock sürücüler...
];

export const mockVehicles = [
  {
    _id: '1',
    plateNumber: '34ABC123',
    vehicleType: 'Kamyon',
    capacity: {
      weight: 5000,
      volume: 20,
    },
    status: 'Müsait',
  },
  // Diğer mock araçlar...
]; 