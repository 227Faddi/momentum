import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['finance', 'career', 'personal'],
    default: 'personal'
  },
  timeFrame: {
    type: String,
    enum: ['shorterm', 'longterm'],
    default: 'shorterm'
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Goal = mongoose.model('Goal', GoalSchema)
export default Goal