const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/session', userController.createSession);

// Protected routes
router.get('/profile', requireAuth, userController.getProfile);

module.exports = router;
