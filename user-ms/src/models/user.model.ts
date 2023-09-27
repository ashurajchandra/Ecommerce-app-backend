
import mongoose, { Document, Schema } from 'mongoose';
import Joi, { Schema as JoiSchema } from '@hapi/joi';
import bcrypt from 'bcrypt';

// Define the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024, // Store hashed password, which is longer
  },
});

// Create a Joi schema for validation
export const userValidationSchema: JoiSchema = Joi.object({
//   username: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(8).max(1024).required(),
});

// Define the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyPassword(password: string): Promise<boolean>;
}

// Hash the user's password before saving it
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to verify a user's password
userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
}

export default mongoose.model<IUser>('User', userSchema);
