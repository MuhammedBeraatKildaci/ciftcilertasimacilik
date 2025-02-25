const { body } = require('express-validator');

exports.shipmentValidation = [
  body('pickup.address').notEmpty().withMessage('Alış adresi gereklidir'),
  body('pickup.date').isISO8601().withMessage('Geçerli bir alış tarihi giriniz'),
  body('pickup.coordinates').isArray().withMessage('Geçerli koordinatlar giriniz'),
  body('delivery.address').notEmpty().withMessage('Teslimat adresi gereklidir'),
  body('delivery.expectedDate').isISO8601().withMessage('Geçerli bir teslimat tarihi giriniz'),
  body('delivery.coordinates').isArray().withMessage('Geçerli koordinatlar giriniz'),
  body('cargo.type').notEmpty().withMessage('Kargo tipi gereklidir'),
  body('cargo.weight').isNumeric().withMessage('Geçerli bir ağırlık giriniz'),
  body('cargo.volume').isNumeric().withMessage('Geçerli bir hacim giriniz'),
  body('price.amount').isNumeric().withMessage('Geçerli bir fiyat giriniz')
];

exports.driverValidation = [
  body('firstName').notEmpty().withMessage('Ad gereklidir'),
  body('lastName').notEmpty().withMessage('Soyad gereklidir'),
  body('licenseNumber').notEmpty().withMessage('Ehliyet numarası gereklidir'),
  body('licenseType').isIn(['B', 'C', 'D', 'E']).withMessage('Geçerli bir ehliyet tipi giriniz'),
  body('phoneNumber').notEmpty().withMessage('Telefon numarası gereklidir'),
  body('userId').notEmpty().withMessage('Kullanıcı ID gereklidir')
];

exports.vehicleValidation = [
  body('plateNumber').notEmpty().withMessage('Plaka numarası gereklidir'),
  body('vehicleType').isIn(['Kamyon', 'Tır', 'Kamyonet', 'Panel Van']).withMessage('Geçerli bir araç tipi giriniz'),
  body('capacity.weight').isNumeric().withMessage('Geçerli bir ağırlık kapasitesi giriniz'),
  body('capacity.volume').isNumeric().withMessage('Geçerli bir hacim kapasitesi giriniz')
]; 