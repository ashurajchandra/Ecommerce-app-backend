// controllers/productController.ts
import { Request, Response, NextFunction } from 'express';
import Product, { IProduct ,productValidationSchema} from '../models/product.model';

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response,
) => {
  try {

        // Validate the request data
        const { error } = productValidationSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
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
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
       // Validate the request data
    //    const { error } = productValidationSchema.validate(req.body);
    //    if (error) {
    //      return res.status(400).json({ error: error.details[0].message });
    //    }
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    console.log("hiii",name)
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, quantity },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID
export const getProductDetail = async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }