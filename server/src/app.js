const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const routes = require('./routes');
const connectDB = require('./config/database');

const app = express();

// Veritabanı bağlantısı
connectDB();

// Güvenlik middleware'leri
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // her IP için maksimum istek sayısı
});
app.use(limiter);

// Loglama
app.use(morgan('combined', { stream: logger.stream }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server ${PORT} portunda çalışıyor`);
});

module.exports = app; 