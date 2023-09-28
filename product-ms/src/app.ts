import express from 'express';
import productRoutes from './routes/product';
import cors from 'cors'
import { errorHandler } from './middleware';
import CustomError from './errors/custom-error';

const app = express()
const corsOptions = {
  // Specify the allowed origins. '*' allows all origins (not recommended for production).
  origin: '*', // Replace with your specific domain(s) or '*' for any origin.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers.
  credentials: true, // Enable CORS credentials (e.g., cookies and authentication headers).
  preflightContinue: false // Disable preflight requests.
}

app.use(cors(corsOptions))
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('*', (req, res, next) => {
  const error = new CustomError('Route not found', 404);
  next(error);
})
app.use(errorHandler);

export default app;