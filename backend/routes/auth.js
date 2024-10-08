import express from 'express';
import passport from 'passport';
import authController from '../controllers/auth.js';

const router = express.Router();

router.post('/logout', authController.logout)

router.post('/login', authController.login)

router.post('/signup', authController.signup)

router.get("/login/success", authController.user);
  
router.get('/google', passport.authenticate('google', { scope: [ 'email' ] }))

router.get('/google/callback', passport.authenticate('google',  { failureRedirect: process.env.CLIENT_URL }), authController.googleCallback)

router.get('/github', passport.authenticate('github', { scope: [ 'user' ] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL }), authController.githubCallback)  

export default router;