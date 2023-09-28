import { NextFunction, Request, Response } from 'express';
import User, { userValidationSchema } from '../models/User';
import jwt from 'jsonwebtoken';
import CustomError from '../errors/custom-error';

const JWT_SECRET = process.env.SECRET_KEY ||'your-secret-key'; // Replace with a strong secret in production

// User Registration
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request data
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      const validationError =  new CustomError(error.details[0].message, 400);
      throw validationError;
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      const validationError =  new CustomError('User already exists', 400);
      throw validationError;
    }

    const user = await User.create(req.body);
    // Create a JWT token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.status(200).json({
        message:"User registered!",
        data:token
    });
  } catch (error) {
    next(error);
  }
};

// User Login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request data
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      const validationError =  new CustomError(error.details[0].message, 400);
      throw validationError;
    }

    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const validationError =  new CustomError('User not found', 404);
      throw validationError;
    }

    // Verify the password
    const validPassword = await user.verifyPassword(req.body.password);
    if (!validPassword) {
      const validationError =  new CustomError('Invalid password', 403);
      throw validationError;
    }

    // Create a JWT token
    const token = jwt.sign({ _id: user._id,username:user.username,email:user.email }, JWT_SECRET,{ expiresIn: '7d' });
    res.status(200).json({
        message:"user login",
        data:token
    });
  } catch (error) {
   next(error);
  }
};

