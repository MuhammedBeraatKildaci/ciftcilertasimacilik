const Shipment = require('../models/Shipment');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

exports.createShipment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const shipment = new Shipment({
      ...req.body,
      customer: req.user.id,
      shipmentNumber: `SHP-${Date.now()}`
    });

    await shipment.save();
    logger.info(`Yeni sevkiyat oluşturuldu: ${shipment.shipmentNumber}`);

    res.status(201).json(shipment);
  } catch (error) {
    logger.error('Sevkiyat oluşturma hatası:', error);
    res.status(500).json({ message: 'Sevkiyat oluşturulurken bir hata oluştu' });
  }
};

exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find(
      req.user.role === 'admin' ? {} : { customer: req.user.id }
    )
    .populate('customer', 'email')
    .populate('vehicle', 'plateNumber')
    .populate('driver', 'firstName lastName');

    res.json(shipments);
  } catch (error) {
    logger.error('Sevkiyat listeleme hatası:', error);
    res.status(500).json({ message: 'Sevkiyatlar listelenirken bir hata oluştu' });
  }
};

exports.updateShipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const shipment = await Shipment.findById(id);
    if (!shipment) {
      return res.status(404).json({ message: 'Sevkiyat bulunamadı' });
    }

    shipment.status = status;
    if (status === 'Teslim Edildi') {
      shipment.delivery.actualDate = new Date();
    }

    await shipment.save();
    logger.info(`Sevkiyat durumu güncellendi: ${shipment.shipmentNumber} - ${status}`);

    res.json(shipment);
  } catch (error) {
    logger.error('Sevkiyat güncelleme hatası:', error);
    res.status(500).json({ message: 'Sevkiyat güncellenirken bir hata oluştu' });
  }
}; 