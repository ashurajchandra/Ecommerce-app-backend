import express, { Request, Response } from 'express';
import Product, { productValidationSchema, IProduct } from '../models/product.model';
import {createProduct,getAllProducts,updateProduct,deleteProduct,getProductDetail} from "../controllers/products.controller"
const router = express.Router();

// Create a new product
router.post('/createProduct',createProduct );

// Get all products
router.get('/getAllProducts', getAllProducts);

// Get a single product by ID
router.get('/getProductDetail/:id', getProductDetail);

// Update a product by ID
router.put('/updateProductDetail/:id',updateProduct );

// Delete a product by ID
router.delete('/deleteProduct/:id', deleteProduct);

export default router;
