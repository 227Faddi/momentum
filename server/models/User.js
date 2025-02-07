import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: false,
    sparse: true,
  },
  password: {
    type: String,
    required: false,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
