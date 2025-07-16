import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables

import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes); // Handles /register, /login, etc.

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB, starting server...');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB', error);
    process.exit(1);
  }
};
// Catch-all 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});


startServer();
