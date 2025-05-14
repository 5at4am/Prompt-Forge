const { getDb } = require('../database/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

class UserModel {
  /**
   * Create a new user
   */
  static async create(userData) {
    const db = await getDb();
    const id = uuidv4();
    const { username, email, password } = userData;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await db.run(
      `INSERT INTO users (id, username, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [id, username, email, password_hash]
    );

    const user = await this.getById(id);
    delete user.password_hash; // Don't return the password hash
    return user;
  }

  /**
   * Get user by ID
   */
  static async getById(id) {
    const db = await getDb();
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  }

  /**
   * Get user by email
   */
  static async getByEmail(email) {
    const db = await getDb();
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
  }

  /**
   * Get user by username
   */
  static async getByUsername(username) {
    const db = await getDb();
    return db.get('SELECT * FROM users WHERE username = ?', [username]);
  }

  /**
   * Verify user credentials
   */
  static async verifyCredentials(email, password) {
    const user = await this.getByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return null;
    }

    delete user.password_hash; // Don't return the password hash
    return user;
  }

  /**
   * Create a session for anonymous users
   */
  static async createSession() {
    const db = await getDb();
    const id = uuidv4();

    await db.run('INSERT INTO sessions (id) VALUES (?)', [id]);

    return { id };
  }
}

module.exports = UserModel;
