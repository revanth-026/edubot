import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import resumeRoutes from './routes/resumeRoutes';

const app = express();

// ✅ Use wildcard origin with credentials support (for Codespaces)
app.use(cors({
  origin: 'https://musical-meme-694r5pwvg9xrhqw9-5173.app.github.dev/',  // allow frontend origin
  credentials: true
}));

app.use(express.json());

// ✅ Health check route
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

// ✅ API Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);

// ✅ 404 Fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB', error);
    process.exit(1);
  }
};

startServer();
