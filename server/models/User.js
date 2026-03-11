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
    trim: true,
    validate: {
      validator: function(v) {
        return v && (v.endsWith('@jyothyit.ac.in') || v.endsWith('@jit.ac.in'));
      },
      message: 'Please use your official college email (@jyothyit.ac.in or @jit.ac.in)'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    validate: {
      validator: function(v) {
        return v && v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v);
      },
      message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    }
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['student', 'faculty', 'alumni', 'department']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // Student fields
  usn: String,
  branch: String,
  year: String,
  
  // Faculty fields
  department: String,
  designation: String,
  experience: String,
  researchInterests: [String],
  currentProjects: [String],
  
  // Alumni fields
  batch: String,
  company: String,
  
  // Department fields
  deptName: String,
  deptDescription: String,
  events: [{
    title: String,
    date: Date,
    description: String,
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now }
  }],
  
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
