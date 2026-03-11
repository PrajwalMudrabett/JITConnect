import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalMessages = await Message.countDocuments();
    
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(10);

    const recentPosts = await Post.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalUsers,
      totalPosts,
      totalMessages,
      usersByRole,
      recentUsers,
      recentPosts
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user's posts
    await Post.deleteMany({ user: req.params.id });
    
    // Delete user's messages
    await Message.deleteMany({ 
      $or: [{ sender: req.params.id }, { receiver: req.params.id }] 
    });
    
    // Delete user's notifications
    await Notification.deleteMany({ 
      $or: [{ sender: req.params.id }, { recipient: req.params.id }] 
    });

    await user.deleteOne();
    res.json({ message: 'User and all related data deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/admin/posts
// @desc    Get all posts
// @access  Private/Admin
router.get('/posts', protect, adminOnly, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/admin/posts/:id
// @desc    Delete a post
// @access  Private/Admin
router.delete('/posts/:id', protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/admin/users/:id/ban
// @desc    Ban/Unban a user
// @access  Private/Admin
router.put('/users/:id/ban', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ 
      message: user.isBanned ? 'User banned' : 'User unbanned',
      user: { _id: user._id, name: user.name, isBanned: user.isBanned }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed analytics
// @access  Private/Admin
router.get('/analytics', protect, adminOnly, async (req, res) => {
  try {
    // Posts by category
    const postsByCategory = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Most active users (by posts)
    const mostActiveUsers = await Post.aggregate([
      { $group: { _id: '$user', postCount: { $sum: 1 } } },
      { $sort: { postCount: -1 } },
      { $limit: 10 },
      { 
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $project: {
          name: '$userInfo.name',
          email: '$userInfo.email',
          role: '$userInfo.role',
          postCount: 1
        }
      }
    ]);

    // Posts per day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const postsPerDay = await Post.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      postsByCategory,
      mostActiveUsers,
      postsPerDay
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
