import express from 'express';
import Announcement from '../models/Announcement.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/announcements
// @desc    Get announcements based on user role
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('role department branch');
    
    // Build query based on user role
    const query = { isActive: true };
    
    if (user.role === 'student') {
      query.$or = [
        { targetRoles: 'student' },
        { targetRoles: 'all' }
      ];
    } else if (user.role === 'faculty') {
      query.$or = [
        { targetRoles: 'faculty' },
        { targetRoles: 'all' },
        { facultyMember: req.user._id }
      ];
    } else if (user.role === 'alumni') {
      query.$or = [
        { targetRoles: 'alumni' },
        { targetRoles: 'all' }
      ];
    } else if (user.role === 'department') {
      query.$or = [
        { targetRoles: 'department' },
        { targetRoles: 'all' },
        { targetDepartment: user.department }
      ];
    }
    
    const announcements = await Announcement.find(query)
      .populate('createdBy', 'name email')
      .sort({ priority: -1, createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/announcements
// @desc    Create new announcement
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, content, priority, targetRoles, targetDepartment, targetBranch, researchProject, researchSkillsNeeded, facultyMember } = req.body;

    const announcement = await Announcement.create({
      title,
      content,
      priority,
      targetRoles: targetRoles || ['student', 'faculty', 'alumni', 'department'],
      targetDepartment,
      targetBranch,
      researchProject,
      researchSkillsNeeded: researchSkillsNeeded || [],
      facultyMember: facultyMember || req.user._id,
      createdBy: req.user._id
    });

    const populatedAnnouncement = await Announcement.findById(announcement._id)
      .populate('createdBy', 'name email');

    res.status(201).json(populatedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/announcements/:id
// @desc    Delete announcement
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    await announcement.deleteOne();
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/announcements/:id/toggle
// @desc    Toggle announcement active status
// @access  Private/Admin
router.put('/:id/toggle', protect, adminOnly, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    announcement.isActive = !announcement.isActive;
    await announcement.save();

    res.json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
