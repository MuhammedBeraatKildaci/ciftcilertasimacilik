const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Driver = require('../models/Driver');
const { setupTestDB, generateTestToken } = require('./testUtils');

setupTestDB();

describe('Driver API', () => {
  let adminToken;
  let adminUser;
  let driverUser;

  beforeEach(async () => {
    adminUser = await User.create({
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    
    driverUser = await User.create({
      email: 'driver@example.com',
      password: 'password123',
      role: 'user'
    });

    adminToken = generateTestToken(adminUser);
  });

  describe('POST /api/drivers', () => {
    it('should create a new driver when valid data is provided', async () => {
      const driverData = {
        userId: driverUser._id,
        firstName: 'Test',
        lastName: 'Driver',
        licenseNumber: 'TEST123',
        licenseType: 'E',
        phoneNumber: '5551234567'
      };

      const res = await request(app)
        .post('/api/drivers')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(driverData);

      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe(driverData.firstName);
      expect(res.body.licenseNumber).toBe(driverData.licenseNumber);
    });

    it('should return error when non-admin tries to create driver', async () => {
      const userToken = generateTestToken(driverUser);
      const driverData = {
        userId: driverUser._id,
        firstName: 'Test',
        lastName: 'Driver',
        licenseNumber: 'TEST123',
        licenseType: 'E',
        phoneNumber: '5551234567'
      };

      const res = await request(app)
        .post('/api/drivers')
        .set('Authorization', `Bearer ${userToken}`)
        .send(driverData);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/drivers', () => {
    beforeEach(async () => {
      await Driver.create({
        userId: driverUser._id,
        firstName: 'Test',
        lastName: 'Driver',
        licenseNumber: 'TEST123',
        licenseType: 'E',
        phoneNumber: '5551234567'
      });
    });

    it('should return all drivers', async () => {
      const res = await request(app)
        .get('/api/drivers')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });
  });
}); 