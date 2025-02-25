const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { createShipment, getShipments, updateShipmentStatus } = require('../controllers/shipmentController');
const { shipmentValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', protect, shipmentValidation, createShipment);
router.get('/', protect, getShipments);
router.patch('/:id/status', protect, authorize('admin'), updateShipmentStatus);

module.exports = router; 