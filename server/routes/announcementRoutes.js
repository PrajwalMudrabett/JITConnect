import express from 'express';
import Announcement from '../models/Announcement.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Admin middleware
const adminOnly = (req, res, next) => {
  if (req.user.email !== 'admin@jyothyit.ac.in' && req.user.email !== 'principal@jyothyit.ac.in') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// @route   GET /api/announcements
// @desc    Get all active announcements
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
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
    const { title, content, priority } = req.body;

    const announcement = await Announcement.create({
      title,
      content,
      priority,
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
