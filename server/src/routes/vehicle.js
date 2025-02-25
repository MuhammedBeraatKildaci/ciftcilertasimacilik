const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { createVehicle, getVehicles, updateVehicleStatus } = require('../controllers/vehicleController');
const { vehicleValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', protect, authorize('admin'), vehicleValidation, createVehicle);
router.get('/', protect, getVehicles);
router.patch('/:id/status', protect, authorize('admin'), updateVehicleStatus);

module.exports = router; 