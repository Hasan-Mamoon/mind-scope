import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import { authRouter } from './routes/authRoutes.js';
import { journalRoutes } from './routes/journalRoutes.js';

config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/journal', journalRoutes);

// MongoDB Connection
connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mind-scope')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 