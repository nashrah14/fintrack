require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();

connectDB();

app.use(helmet());

app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 120,                
  standardHeaders: true,   
  legacyHeaders: false,    
});
app.use(limiter);

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
