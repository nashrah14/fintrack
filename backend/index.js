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
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 120,                 // limit each IP to 120 requests per min
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// FRONTEND_URLS = "http://localhost:3000,https://your-vercel.vercel.app"
const allowedOrigins = (
  process.env.FRONTEND_URLS ||
  process.env.CLIENT_ORIGIN ||
  'http://localhost:3000'
)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

console.log("CORS Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman / curl (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS Blocked Origin:", origin);
      return callback(new Error("CORS not allowed by server"), false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    status: 'Backend running',
    time: new Date().toISOString(),
  });
});

app.get('/', (req, res) => res.send('API running'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

// ---------------------------
//  START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server started on port ${PORT}`)
);
