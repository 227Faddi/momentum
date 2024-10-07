import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export default {
  // GET USER 
  user: asyncHandler(async (req, res) => {
    const user = req.user
    if (user) {
      res.status(200).json({
        user: {
          _id: user.id,
          username: user.username,
          email: user.email,
          points: user.points,
        },
        token: generateToken(user._id),
      });
    } else{
      res.status(400).json({ status: 'error', message: [req.user, req.session] })
      // res.status(400).json({ status: 'error', message: 'Login Failed. Please try again' })
      throw new Error('User not present')
    }
  }),

  // SOCIALS
  googleCallback: asyncHandler( async (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/?google`)
  }),
  githubCallback: asyncHandler( async (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/?github`)
  }),

  // LOGIN
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Check for user email
    const user = await User.findOne({ email })
    if (user && (bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
        points: user.points
      })
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid email or password. Please try again' })
      throw new Error('Invalid credentials')
    }
  }),
  
  // LOGOUT
  logout: asyncHandler( async (req, res, next) => {
    req.logout((error) => {
      req.session.destroy((err) => {
        if (error){ 
          return res.status(400).json({ status: 'error', message: 'Login failed. Please try again'})
        }
        req.user = null;
        res.status(200).json({ status: 'success', message: 'Logout completed successfully'})
      });
    })
  }),  

  // SIGNUP
  signup: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400).json({ status: 'error', message: 'Registration failed. Please ensure all fields are filled correctly'})
      throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400).json({ status: 'error', message: 'User email already exists. Please log in instead'})
      throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
        points: 0,
      })
    } else {
      res.status(400).json({ status: 'error', message: 'Registration failed. Invalid user data'})
      throw new Error('Invalid user data')
    }
  }),
}