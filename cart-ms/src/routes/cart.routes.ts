import express from 'express';
import { verifyToken } from '../configs/auth.middleware';
import {
  createCart,
  getAllCarts,
  getCartByUserId,
  updateCartByUserId,
  deleteCartByUserId,
} from '../controllers/cart.controller';

const router = express.Router();
 router.use(verifyToken);
// Create a new cart for a user
router.post('/createCart', createCart);

// Get all carts
router.get('/getAllCarts', getAllCarts);

// Get a single cart by user ID
router.get('/getUserCart', getCartByUserId);

// Update a cart by user ID
router.put('/updateUserCart', updateCartByUserId);

// Delete a cart by user ID
router.delete('/deleteUserCart', deleteCartByUserId);

export default router;
