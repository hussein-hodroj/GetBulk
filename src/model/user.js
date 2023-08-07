// user.js (model)
import mongoose from "mongoose";

const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
  TRAINER: 'trainer',
};

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (value) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
        return passwordRegex.test(value);
      },
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and no spacing',
    },
  },
  address: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
  },
  imagePath: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
