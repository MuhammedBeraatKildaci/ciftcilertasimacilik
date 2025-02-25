const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const { setupTestDB, generateTestToken } = require('./testUtils');

setupTestDB();

describe('Vehicle API', () => {
  let adminToken;
  let adminUser;

  beforeEach(async () => {
    adminUser = await User.create({
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    adminToken = generateTestToken(adminUser);
  });

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle when valid data is provided', async () => {
      const vehicleData = {
        plateNumber: '34ABC123',
        vehicleType: 'Kamyon',
        capacity: {
          weight: 5000,
          volume: 20
        }
      };

      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(vehicleData);

      expect(res.status).toBe(201);
      expect(res.body.plateNumber).toBe(vehicleData.plateNumber);
      expect(res.body.vehicleType).toBe(vehicleData.vehicleType);
    });

    it('should validate vehicle data', async () => {
      const invalidData = {
        plateNumber: '',
        vehicleType: 'InvalidType'
      };

      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('PATCH /api/vehicles/:id/status', () => {
    let testVehicle;

    beforeEach(async () => {
      testVehicle = await Vehicle.create({
        plateNumber: '34ABC123',
        vehicleType: 'Kamyon',
        capacity: {
          weight: 5000,
          volume: 20
        }
      });
    });

    it('should update vehicle status', async () => {
      const res = await request(app)
        .patch(`/api/vehicles/${testVehicle._id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'Bakımda' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Bakımda');
    });
  });
}); 