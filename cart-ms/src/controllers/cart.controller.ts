import { Request, Response } from 'express';
import Cart, { ICart, cartValidationSchema } from '../models/cart.model';

// Create a new cart for a user
export const createCart = async (req: Request, res: Response) => {
  try {
    // Validate the request data
    const { error } = cartValidationSchema.validate(req.body);
    console.log("req.body",req.body)
    console.log("error",error)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
     const {userId} = req.headers;
     const {product, quantity} = req.body;
     const newCartItem = {userId:userId, product:product, quantity:quantity}
    const cart = await Cart.create(newCartItem);

    res.status(201).json({
      message:"Cart created",
      data:cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',data:{} });
  }
};

// Get all carts
export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.find();
    res.json({
      message:"list of cards",
      data:carts
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',data:[] });
  }
};

// Get a single cart by user ID
export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.headers.userId});
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found',data:{} });
    }
    res.json({
      message:"cart found",
      data:cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', data:{} });
  }
};

// Update a cart by user ID
export const updateCartByUserId = async (req: Request, res: Response) => {
  try {
    // Validate the request data
    const { error } = cartValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.headers.userId},
      req.body,
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found', data:{} });
    }

    res.json({
      message:"cart updated",
      data:cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',data:{} });
  }
};

// Delete a cart by user ID
export const deleteCartByUserId = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOneAndRemove({ user: req.headers.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found',data:{} });
    }
    res.json({
      message:"Cart deleted",
      data:cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',data:{} });
  }
};
