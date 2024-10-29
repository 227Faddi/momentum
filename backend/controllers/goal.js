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
    
    await GoalsDB.create(req.body)

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
    
    if (goal.user.toString() !== req.user.id) {
      res.status(401).json({ status: 'error', message: 'Unauthorized access. User not authorized.'})
      throw new Error('User not authorized')
    }

    await GoalsDB.findByIdAndUpdate(req.params.id, { completed: true })
    await UserDB.findByIdAndUpdate(req.user.id, { points: req.user.points + 10 })
  
    res.status(200).json({ status: 'success', message: 'Goal completed! Good Job' })
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

    if (goal.user.toString() !== req.user.id) {
      res.status(401).json({ status: 'error', message: 'Unauthorized access. User not authorized.'})
      throw new Error('User not authorized')
    }
  
    await goal.deleteOne()
    res.status(200).json({ status: 'success', message: 'Goal deleted successfully'})
  }),      
}