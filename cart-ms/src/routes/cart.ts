import express from 'express';
import { verifyToken } from '../middleware/index';
import {
  upsertCart,
  getCartByUserId,
  deleteCartProduct,
  updateCartProduct
} from '../controllers/cart-controller';

const router = express.Router();
// Create a new cart for a user
router.post('/', verifyToken, upsertCart);

// Get a single cart by user ID
router.get('/',verifyToken, getCartByUserId);

router.put("/:productId",verifyToken, updateCartProduct);
router.delete("/:productId",verifyToken, deleteCartProduct)


export default router;
