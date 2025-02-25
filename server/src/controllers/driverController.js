const Driver = require('../models/Driver');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.createDriver = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const driver = new Driver(req.body);
    await driver.save();
    logger.info(`Yeni sürücü oluşturuldu: ${driver.firstName} ${driver.lastName}`);

    res.status(201).json(driver);
  } catch (error) {
    logger.error('Sürücü oluşturma hatası:', error);
    res.status(500).json({ message: 'Sürücü oluşturulurken bir hata oluştu' });
  }
};

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate('userId', 'email');
    res.json(drivers);
  } catch (error) {
    logger.error('Sürücü listeleme hatası:', error);
    res.status(500).json({ message: 'Sürücüler listelenirken bir hata oluştu' });
  }
};

exports.updateDriverStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, currentLocation } = req.body;

    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Sürücü bulunamadı' });
    }

    if (status) driver.status = status;
    if (currentLocation) driver.currentLocation = currentLocation;

    await driver.save();
    logger.info(`Sürücü durumu güncellendi: ${driver.firstName} ${driver.lastName}`);

    res.json(driver);
  } catch (error) {
    logger.error('Sürücü güncelleme hatası:', error);
    res.status(500).json({ message: 'Sürücü güncellenirken bir hata oluştu' });
  }
}; 