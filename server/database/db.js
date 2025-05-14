const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Database connection
const dbPath = path.join(dbDir, 'promptforge.db');

// Create and initialize the database
async function initializeDatabase() {
  try {
    // Open database connection
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Load and execute schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Create a singleton connection to be used throughout the app
let dbInstance = null;

async function getDb() {
  if (!dbInstance) {
    dbInstance = await initializeDatabase();
  }
  return dbInstance;
}

module.exports = { getDb };
