import mongoose, { Document, Schema } from 'mongoose';
import Joi, { Schema as JoiSchema } from '@hapi/joi';

const productSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

// Define the cart schema
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  products: [productSchema], // Array of product objects
});

// Define validation schema for product objects
const productValidationSchema = Joi.object({
  price: Joi.number().required(),
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  description: Joi.string(),
});

// Define validation schema for the entire cart
export const cartValidationSchema = Joi.object({
  // userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // ObjectId pattern validation
  products: Joi.array().items(productValidationSchema), // Array of product objects
});


// Define the Cart model
interface SingleProduct{
  _id:string;
  name:string;
  price:number;
  quantity:number;
  description?:string
}
export interface ICart extends Document {
  userId: string;
  products:SingleProduct[];
  // quantities: number[];
}

export default mongoose.model<ICart>('Cart', cartSchema);
