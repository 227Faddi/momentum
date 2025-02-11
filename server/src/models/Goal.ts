import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['finance', 'career', 'personal'],
    default: 'personal',
    required: true,
  },
  timeFrame: {
    type: String,
    enum: ['shorterm', 'longterm'],
    default: 'shorterm',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Goal = mongoose.model('Goal', GoalSchema);
export default Goal;
