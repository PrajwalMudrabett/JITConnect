import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['student', 'faculty', 'alumni', 'department']
  },
  // Student fields
  usn: String,
  branch: String,
  year: String,
  
  // Faculty fields
  department: String,
  designation: String,
  experience: String,
  
  // Alumni fields
  batch: String,
  company: String,
  
  // Department fields
  deptName: String,
  deptDescription: String,
  
  // Common fields
  bio: {
    type: String,
    default: ''
  },
  profilePic: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  connectionRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isBanned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
