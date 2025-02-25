const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Shipment = require('../models/Shipment');
const { setupTestDB, generateTestToken } = require('./testUtils');

setupTestDB();

describe('Shipment API', () => {
  let token;
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      email: 'test@example.com',
      password: 'password123',
      role: 'admin'
    });
    token = generateTestToken(testUser);
  });

  describe('POST /api/shipments', () => {
    it('should create a new shipment when valid data is provided', async () => {
      const shipmentData = {
        pickup: {
          address: 'Test Pickup Address',
          date: new Date().toISOString(),
          coordinates: [41.0082, 28.9784]
        },
        delivery: {
          address: 'Test Delivery Address',
          expectedDate: new Date().toISOString(),
          coordinates: [39.9334, 32.8597]
        },
        cargo: {
          type: 'Test Cargo',
          weight: 1000,
          volume: 2,
          description: 'Test Description'
        },
        price: {
          amount: 1500,
          currency: 'TRY'
        }
      };

      const res = await request(app)
        .post('/api/shipments')
        .set('Authorization', `Bearer ${token}`)
        .send(shipmentData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('shipmentNumber');
      expect(res.body.customer.toString()).toBe(testUser._id.toString());
    });

    it('should return validation error for invalid data', async () => {
      const invalidData = {
        pickup: {
          address: '',
          date: 'invalid-date'
        }
      };

      const res = await request(app)
        .post('/api/shipments')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/shipments', () => {
    beforeEach(async () => {
      await Shipment.create({
        shipmentNumber: 'TEST-001',
        customer: testUser._id,
        pickup: {
          address: 'Test Address',
          date: new Date(),
          coordinates: [41.0082, 28.9784]
        },
        delivery: {
          address: 'Test Delivery',
          expectedDate: new Date(),
          coordinates: [39.9334, 32.8597]
        },
        cargo: {
          type: 'Test',
          weight: 100,
          volume: 1
        },
        price: {
          amount: 1000
        }
      });
    });

    it('should return all shipments for admin user', async () => {
      const res = await request(app)
        .get('/api/shipments')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });
  });
}); 