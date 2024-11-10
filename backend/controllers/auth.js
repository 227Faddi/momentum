import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default {
  currentUser: asyncHandler(async (req, res) => {
    if(req.user){
      return res.status(200).json(req.user)
    } else{
      res
      .status(400)
      .json({
        status: 'error',
        message: 'User not present',
      });
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res
        .status(400)
        .json({
          status: 'error',
          message: 'Invalid email or password. Please try again',
        });
      throw new Error('Invalid credentials');
    }
  }),

  signup: asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword} = req.body;

    if (!username || !email || !password || !confirmPassword) {
      res
        .status(400)
        .json({
          status: 'error',
          message:
            'Registration failed. Please ensure all fields are filled correctly',
        });
      throw new Error('Please add all fields');
    }

    if(password != confirmPassword){
      res
      .status(400)
      .json({
        status: 'error',
        message:
          'Passwords do not match',
      });
      throw new Error('Passwords do not match');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res
        .status(400)
        .json({
          status: 'error',
          message: 'User email already exists. Please log in instead',
        });
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
      });
    } else {
      res
        .status(400)
        .json({
          status: 'error',
          message: 'Registration failed. Invalid user data',
        });
      throw new Error('Invalid user data');
    }
  }),
};
