import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import authMiddleware from '../middleware/home.js'

const router = express.Router()

router.get('/', authMiddleware.ensureAuth, dashboardController.getDashboard)

export default router;
