const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  status: {
    type: String,
    enum: ['Beklemede', 'Onaylandı', 'Yolda', 'Teslim Edildi', 'İptal'],
    default: 'Beklemede'
  },
  pickup: {
    address: { type: String, required: true },
    date: { type: Date, required: true },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  delivery: {
    address: { type: String, required: true },
    expectedDate: { type: Date, required: true },
    actualDate: Date,
    coordinates: {
      type: [Number],
      required: true
    }
  },
  cargo: {
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    volume: { type: Number, required: true },
    description: String
  },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'TRY' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Shipment', shipmentSchema); 