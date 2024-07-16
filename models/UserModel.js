import mongoose from 'mongoose';

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  isBlocked: {
    type: Boolean,
    default: false,
    required: true
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
});

export const UserDB = mongoose.model('User', UserSchema);
