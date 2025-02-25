const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['Kamyon', 'Tır', 'Kamyonet', 'Panel Van']
  },
  capacity: {
    weight: { type: Number, required: true }, // kg cinsinden
    volume: { type: Number, required: true }  // m³ cinsinden
  },
  status: {
    type: String,
    enum: ['Müsait', 'Yolda', 'Bakımda', 'Arızalı'],
    default: 'Müsait'
  },
  currentDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  lastMaintenance: {
    date: Date,
    description: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema); 