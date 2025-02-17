import asyncHandler from 'express-async-handler';
import Goal from '../models/Goal.js';
import User from '../models/User.js';

export default {
  getGoals: asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user, completed: false });
    res.status(200).json(goals);
  }),

  getLeaderboard: asyncHandler(async (req, res) => {
    const users = await User.find()
      .sort({ points: -1 })
      .limit(5)
      .select('username email points');
    res.status(200).json(users);
  }),

  addGoal: asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400).json({ message: 'Please add a title field' });
      throw new Error('Please add a title field');
    }
    req.body.user = req.user;

    await Goal.create(req.body);

    res.status(200).json({ message: 'Goal added successfully' });
  }),

  completeGoal: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    const goal = await Goal.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: 'Unauthorized access. Please log in to continue.',
      });
      throw new Error('User not found');
    }

    if (!goal) {
      res.status(400).json({
        message: 'Something went wrong. Goal not found',
      });
      throw new Error('Goal not found');
    }

    if (goal.user.toString() !== req.user) {
      res.status(401).json({
        message: 'Unauthorized access. User not authorized.',
      });
      throw new Error('User not authorized');
    }

    await Goal.findByIdAndUpdate(goal._id, { completed: true });
    await User.findByIdAndUpdate(user._id, { points: user.points + 10 });

    res.status(200).json({ message: 'Goal completed! Good Job' });
  }),

  deleteGoal: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    const goal = await Goal.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        message: 'Unauthorized access. Please log in to continue.',
      });
      throw new Error('User not found');
    }

    if (!goal) {
      res.status(400).json({
        message: 'Something went wrong. Goal not found',
      });
      throw new Error('Goal not found');
    }

    if (goal.user.toString() !== req.user) {
      res.status(401).json({
        message: 'Unauthorized access. User not authorized.',
      });
      throw new Error('User not authorized');
    }

    await goal.deleteOne();
    res.status(200).json({ message: 'Goal deleted successfully' });
  }),
};
