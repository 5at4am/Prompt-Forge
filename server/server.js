const app = require("./app");
const { getDb } = require("./database/db");

const PORT = process.env.PORT || 3001;

// Initialize the database before starting the server
async function startServer() {
  try {
    // Initialize database connection
    await getDb();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
