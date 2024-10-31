import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database.js';
// Routes
import goalRoutes from './routes/goal.js';
import authRoutes from './routes/auth.js';

dotenv.config({ path: './config/.env' });
const app = express();
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use('/api/goals', goalRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
