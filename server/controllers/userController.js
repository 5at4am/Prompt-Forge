const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 * Controller for user-related operations
 */
class UserController {
  /**
   * Register a new user
   */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if user already exists
      const existingEmail = await UserModel.getByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const existingUsername = await UserModel.getByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }

      // Create user
      const user = await UserModel.create({ username, email, password });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });

      return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    }
  }

  /**
   * Login user
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Verify credentials
      const user = await UserModel.verifyCredentials(email, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Failed to login' });
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const user = await UserModel.getById(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Don't send password hash
      delete user.password_hash;

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error getting profile:', error);
      return res.status(500).json({ error: 'Failed to get profile' });
    }
  }

  /**
   * Create a session for anonymous users
   */
  async createSession(req, res) {
    try {
      const session = await UserModel.createSession();
      return res.status(200).json(session);
    } catch (error) {
      console.error('Error creating session:', error);
      return res.status(500).json({ error: 'Failed to create session' });
    }
  }
}

module.exports = new UserController();
