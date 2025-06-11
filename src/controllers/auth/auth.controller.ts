import { Request, Response } from 'express';
import User from '@/models/User';

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
      return;
    }

    // Create user
    const user = await User.create({
      email,
      password
    });
    // Generate access token
    const accessToken = user.generateAccessToken();
    res.status(201).json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.log('Error registering user ' + JSON.stringify(error));
    res.status(500).json({
      success: false,
      message: 'Error registering user ' + JSON.stringify(error)
    });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
      return;
    }

    // Generate access token
    const accessToken = user.generateAccessToken();

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.log('Error logging in ' + JSON.stringify(error));
    res.status(500).json({
      success: false,
      message: 'Error logging in ' + JSON.stringify(error)
    });
  }
};