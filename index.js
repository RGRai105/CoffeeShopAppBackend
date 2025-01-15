import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pkg from 'pg';  // Import the entire 'pg' module as 'pkg'
const { Pool } = pkg;  // Destructure Pool from 'pkg'





const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();
app.use(cors()); // Enable CORS

// Database connection setup (PostgreSQL)
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows); // Return the users from the database
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
