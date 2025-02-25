const express = require('express');
const shipmentRoutes = require('./shipment');
const driverRoutes = require('./driver');
const vehicleRoutes = require('./vehicle');

const router = express.Router();

router.use('/shipments', shipmentRoutes);
router.use('/drivers', driverRoutes);
router.use('/vehicles', vehicleRoutes);

module.exports = router; 