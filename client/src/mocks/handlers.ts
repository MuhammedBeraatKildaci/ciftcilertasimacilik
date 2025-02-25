import { rest } from 'msw';
import { mockShipments, mockDrivers, mockVehicles } from './mockData';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Shipments
  rest.get(`${baseUrl}/shipments`, (req, res, ctx) => {
    const searchTerm = req.url.searchParams.get('search')?.toLowerCase();
    let data = mockShipments;
    
    if (searchTerm) {
      data = data.filter(shipment => 
        shipment.shipmentNumber.toLowerCase().includes(searchTerm) ||
        shipment.pickup.address.toLowerCase().includes(searchTerm) ||
        shipment.delivery.address.toLowerCase().includes(searchTerm)
      );
    }
    
    return res(ctx.status(200), ctx.json(data));
  }),

  // Drivers
  rest.get(`${baseUrl}/drivers`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDrivers));
  }),

  // Vehicles
  rest.get(`${baseUrl}/vehicles`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockVehicles));
  }),
]; 