import mongoose, { Document, Schema } from 'mongoose';
import Joi, { Schema as JoiSchema } from '@hapi/joi';

// export interface IProduct{
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
// }

// let Product:IProduct = {
//   name:"xyz",
//   description:"desc",
//   price:50,
//   quantity:1
// };
// Define the schema
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  product: [{type:Schema.Types.Mixed }],
  quantity:[{
    type:Number,
    default:1
  }],
});

// Create a Joi schema for validation
export const cartValidationSchema: JoiSchema = Joi.object({
  //  userId: Joi.object,
  product: Joi.array().items(Joi.object()).required(),
  // quantity: Joi.array().items(Joi.object().min(0)).required(),
});

// Define the Cart model
export interface ICart extends Document {
  userId: string;
  productIds: string[];
  // quantities: number[];
}

export default mongoose.model<ICart>('Cart', cartSchema);
