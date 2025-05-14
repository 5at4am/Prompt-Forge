const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const promptRoutes = require('./routes/promptRoutes');
const userRoutes = require('./routes/userRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

// Import middleware
const { authMiddleware, sessionMiddleware } = require('./middleware/auth');

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Authentication middleware
app.use(authMiddleware);
app.use(sessionMiddleware);

// API routes
app.use('/api/prompts', promptRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interactions', interactionRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;
