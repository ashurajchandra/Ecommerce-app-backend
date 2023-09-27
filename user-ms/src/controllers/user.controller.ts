import { Request, Response } from 'express';
import User, { IUser, userValidationSchema } from '../models/user.model';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY||'your-secret-key'; // Replace with a strong secret in production

// User Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate the request data
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message, data:null });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists',data:null });
    }

    const user = await User.create(req.body);
    // Create a JWT token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.status(200).json({
        message:"User registered!",
        data:token
    });
  } catch (error) {
    res.status(500).json({
         error: 'Internal server error',
         data:null
        });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate the request data
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message , data:null});
    }

    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found',data:null });
    }

    // Verify the password
    const validPassword = await user.verifyPassword(req.body.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password',data:null });
    }

    // Create a JWT token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    // const {password, ...others} = user._doc;

    res.status(200).json({
        message:"user login",
        // data:others,
        data:token
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error',data:null });
  }
};

