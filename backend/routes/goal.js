import express from 'express';
import goalController from '../controllers/goal.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', protect, goalController.getGoals)

router.post('/add', protect, goalController.addGoal)

router.put('/complete/:id', protect, goalController.completeGoal)

router.delete('/delete/:id', protect, goalController.deleteGoal)

export default router;