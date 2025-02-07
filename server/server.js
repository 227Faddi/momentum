import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorMiddleware.js';

// Routes
import authRoutes from './routes/auth.js';
import goalRoutes from './routes/goals.js';

dotenv.config({ path: './config/.env' });
const app = express();
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);

app.use(errorHandler);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/goals', goalRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
