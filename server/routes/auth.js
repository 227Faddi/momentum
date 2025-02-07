import express from 'express';
import authController from '../controllers/auth.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);

router.post('/signup', authController.signup);

// router.post('/signup', authController.signup); //logout

router.get('/me', protect, authController.currentUser);

export default router;
