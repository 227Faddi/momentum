import express from 'express';
import goalController from '../controllers/goal.js';
import authMiddleware from '../middleware/home.js'

const router = express.Router()

router.get('/add', authMiddleware.ensureAuth, goalController.getAdd)

router.post('/add', authMiddleware.ensureAuth, goalController.postAdd)

router.put('/updateStatus/:id/:points', authMiddleware.ensureAuth, goalController.updateStatus)

router.delete('/delete/:id', authMiddleware.ensureAuth, goalController.deleteGoal)

export default router;