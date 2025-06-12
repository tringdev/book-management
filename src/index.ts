import 'module-alias/register';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from '@/config/database';
import routes from '@/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'success' });
});

// API Routes
app.use('/api/v1', routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});