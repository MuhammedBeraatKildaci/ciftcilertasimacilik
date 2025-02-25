const Vehicle = require('../models/Vehicle');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.createVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    logger.info(`Yeni araç oluşturuldu: ${vehicle.plateNumber}`);

    res.status(201).json(vehicle);
  } catch (error) {
    logger.error('Araç oluşturma hatası:', error);
    res.status(500).json({ message: 'Araç oluşturulurken bir hata oluştu' });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('currentDriver', 'firstName lastName');
    res.json(vehicles);
  } catch (error) {
    logger.error('Araç listeleme hatası:', error);
    res.status(500).json({ message: 'Araçlar listelenirken bir hata oluştu' });
  }
};

exports.updateVehicleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, currentDriver, lastMaintenance } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Araç bulunamadı' });
    }

    if (status) vehicle.status = status;
    if (currentDriver) vehicle.currentDriver = currentDriver;
    if (lastMaintenance) vehicle.lastMaintenance = lastMaintenance;

    await vehicle.save();
    logger.info(`Araç durumu güncellendi: ${vehicle.plateNumber}`);

    res.json(vehicle);
  } catch (error) {
    logger.error('Araç güncelleme hatası:', error);
    res.status(500).json({ message: 'Araç güncellenirken bir hata oluştu' });
  }
}; 