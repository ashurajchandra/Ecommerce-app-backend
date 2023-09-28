// controllers/productController.ts
import { Request, Response, NextFunction } from 'express';
import Product, { IProduct ,productValidationSchema} from '../models/Product';
import CustomError from '../errors/custom-error';

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request data
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      const validationError =  new CustomError(error.details[0].message, 400);
      throw validationError;
    }

    const { name, description, price, quantity } = req.body;
    const product: IProduct = await  Product.create({
      name,
      description,
      price,
      quantity,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, quantity },
      { new: true }
    );
    if (!updatedProduct) {
      const validationError =  new CustomError('Product not found', 404);
      throw validationError;
    }
    res.json(updatedProduct);
  } catch (err) {
   next(err);
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndRemove(id);
    if (!deletedProduct) {
      const validationError =  new CustomError('Product not found', 404);
      throw validationError;
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

// Get a single product by ID
export const getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        const validationError =  new CustomError('Product not found', 400);
        throw validationError;
      }
      res.json(product);
    } catch (error) {
      next(error);
  }
}