import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  targetRoles: {
    type: [String],
    enum: ['student', 'faculty', 'alumni', 'department'],
    default: ['student', 'faculty', 'alumni', 'department']
  },
  targetDepartment: {
    type: String,
    default: null
  },
  targetBranch: {
    type: String,
    default: null
  },
  researchProject: {
    type: String,
    default: null
  },
  researchSkillsNeeded: [String],
  facultyMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
