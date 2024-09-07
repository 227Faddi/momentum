import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: false,
        sparse: true
    },
    githubId:{
        type: String,
        required: false,
        sparse: true
    },
    userName:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: false,
        sparse: true
    },
    password:{
        type: String,
        required: false
    },
    points:{
        type: Number,
        default: 0
    }
})

// Password hash middleware.
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err) }
            user.password = hash
            next()
        })
    })
})
  
  
UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        resolve(isMatch);
      });
    });
};
  

const User = mongoose.model('User', UserSchema);
export default User;

