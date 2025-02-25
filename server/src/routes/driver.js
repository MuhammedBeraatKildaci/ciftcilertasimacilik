const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { createDriver, getDrivers, updateDriverStatus } = require('../controllers/driverController');
const { driverValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/', protect, authorize('admin'), driverValidation, createDriver);
router.get('/', protect, getDrivers);
router.patch('/:id/status', protect, authorize('admin'), updateDriverStatus);

module.exports = router; 