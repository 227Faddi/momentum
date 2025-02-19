import express from 'express';
import goalController from '../controllers/goal.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, goalController.getGoals);

router.get('/leaderboard', protect, goalController.getLeaderboard);

router.post('/', protect, goalController.addGoal);

router.put('/:id/complete', protect, goalController.completeGoal);

router.delete('/:id', protect, goalController.deleteGoal);

export default router;
