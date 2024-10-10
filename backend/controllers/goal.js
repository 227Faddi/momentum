import GoalsDB from '../models/Goal.js';
import UserDB from '../models/User.js';
import asyncHandler from 'express-async-handler';

export default {
    getGoals: asyncHandler(async (req, res) => {
      const goals = await GoalsDB.find({ user: req.user.id, completed: false})
      res.status(200).json(goals)
    }),

    addGoal: asyncHandler(async (req, res) => {
      if (!req.body.title) {
        res.status(400).json({ status: 'error', message: 'Please add a title field'})
        throw new Error('Please add a title field')
      }
      req.body.user = req.user.id;
      const goal = await GoalsDB.create(req.body)
      res.status(200).json({ status: 'success', message: 'Goal added successfully'})
    }),

    completeGoal: asyncHandler(async (req, res) => {
      if (!req.params.id) {
        res.status(400).json({ status: 'error', message: 'Something went wrong. Goal not found'})
        throw new Error('Goal not found')
      }
      if (!req.user) {
        res.status(401).json({ status: 'error', message: 'Unauthorized access. Please log in to continue.'})
        throw new Error('User not found')
      }

      const goal = await GoalsDB.findById(req.params.id)
      const newPoints = req.user.points + 10;

      const updatedGoal = await GoalsDB.findByIdAndUpdate(req.params.id, {
        completed: true,
      }, { new: true })

      const updateUser = await UserDB.findByIdAndUpdate(req.user.id,{
        points: newPoints
      }, { new: true })
    
      res.status(200).json({ status: 'success', message: 'Goal completed! Good Job', user: updateUser })
    }),

    deleteGoal: asyncHandler(async (req, res) => {
      if (!req.params.id) {
        res.status(400).json({ status: 'error', message: 'Something went wrong. Goal not found'})
        throw new Error('Goal not found')
      }
      if (!req.user) {
        res.status(401).json({ status: 'error', message: 'Unauthorized access. Please log in to continue.'})
        throw new Error('User not found')
      }

      const goal = await GoalsDB.findById(req.params.id)
      
      await goal.deleteOne()
      res.status(200).json({ status: 'success', message: 'Goal deleted successfully'})
  }),      
}