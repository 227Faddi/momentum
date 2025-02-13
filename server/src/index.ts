import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/database.js';

// Routes
import authRoutes from './routes/auth.js';
import goalRoutes from './routes/goals.js';

import { env } from './config/index.js';

dotenv.config();
const app = express();
connectDB();

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/goals', goalRoutes);
app.use('/auth', authRoutes);

app.listen(env.SERVER_PORT, () => {
  console.log(`Server is running on port ${env.SERVER_PORT}`);
});
