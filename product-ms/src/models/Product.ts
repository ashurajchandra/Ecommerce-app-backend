import mongoose, { Document, Schema } from 'mongoose';
import Joi, { Schema as JoiSchema } from '@hapi/joi';

// Define the schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create a Joi schema for validation
export const productValidationSchema: JoiSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
});

// Define the Product model
export interface IProduct{
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default mongoose.model<IProduct>('Product', productSchema);
