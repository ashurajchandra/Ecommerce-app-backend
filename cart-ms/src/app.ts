import express from 'express';
import cartRoutes from './routes/cart.routes';


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/carts', cartRoutes);


// Start the server



  export default app;