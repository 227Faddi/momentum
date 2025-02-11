import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/index.js';
import User from '../models/User.js';

export default {
  me: asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).send(user);
  }),
  refresh: asyncHandler((req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      env.JWT_REFRESH_TOKEN_SECRET,
      async (err: Error | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            res.clearCookie('jwt', {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
            });
            return res.status(401).json({ message: 'Refresh token expired' });
          }
          return res.status(403).json({ message: 'Forbidden' });
        }

        const foundUser = await User.findOne({
          id: (decoded as JwtPayload).id,
        });

        if (!foundUser) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const accessToken = jwt.sign(
          {
            user: {
              id: foundUser._id,
            },
          },
          env.JWT_ACCESS_TOKEN_SECRET,
          { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRATION }
        );

        res.json({ accessToken });
      }
    );
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({
        message: 'Invalid email or password. Please try again',
      });
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: env.JWT_REFRESH_TOKEN_EXPIRATION,
      }
    );

    res.json({ accessToken, refreshToken });
  }),

  signup: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;

    // Check Values
    if (password != confirmPassword) {
      res.status(400).json({
        message: 'Passwords do not match',
      });
      throw new Error('Passwords do not match');
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400).json({
        message: 'User email already exists. Please log in instead',
      });
      throw new Error('User email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    const accessToken = jwt.sign(
      {
        user: {
          id: String(user._id),
        },
      },
      env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: env.JWT_REFRESH_TOKEN_EXPIRATION,
      }
    );

    res.json({
      accessToken,
      refreshToken,
    });
  }),

  // logout: asyncHandler((req: Request, res: Response) => {
  //   const cookies = req.cookies;

  //   if (!cookies?.jwt) {
  //     res.sendStatus(204);
  //     return;
  //   }
  //   res.clearCookie('jwt', {
  //     httpOnly: true,
  //     sameSite: 'none',
  //     secure: true,
  //     domain: env.BASE_DOMAIN,
  //   });

  //   res.status(200).json({ message: 'Cookie cleared' });
  // }),
};
