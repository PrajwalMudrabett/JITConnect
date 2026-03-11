import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import createNotification from '../utils/createNotification.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (for explore page)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select('-password -isAdmin')
      .limit(20);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/users/search
// @desc    Search users
// @access  Private
router.get('/search', protect, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
            { branch: { $regex: query, $options: 'i' } },
            { department: { $regex: query, $options: 'i' } },
            { company: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).select('-password -isAdmin');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -isAdmin');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      user.branch = req.body.branch || user.branch;
      user.department = req.body.department || user.department;
      user.company = req.body.company || user.company;
      user.designation = req.body.designation || user.designation;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.coverImage = req.body.coverImage || user.coverImage;
      user.usn = req.body.usn || user.usn;
      user.year = req.body.year || user.year;
      user.batch = req.body.batch || user.batch;
      user.experience = req.body.experience || user.experience;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isAdmin: updatedUser.isAdmin,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
        coverImage: updatedUser.coverImage,
        branch: updatedUser.branch,
        department: updatedUser.department,
        company: updatedUser.company
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/users/:id/connect
// @desc    Send connection request
// @access  Private
router.post('/:id/connect', protect, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already connected
    if (currentUser.connections.includes(targetUser._id)) {
      return res.status(400).json({ message: 'Already connected' });
    }

    // Check if request already sent
    if (targetUser.connectionRequests.includes(currentUser._id)) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    // Add to connection requests
    targetUser.connectionRequests.push(currentUser._id);
    await targetUser.save();

    // Create notification
    await createNotification(
      targetUser._id,
      currentUser._id,
      'connection_request',
      `${currentUser.name} sent you a connection request`,
      '/connections'
    );

    res.json({ message: 'Connection request sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/users/connect/accept/:id
// @desc    Accept connection request
// @access  Private
router.put('/connect/accept/:id', protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const requestUser = await User.findById(req.params.id);

    if (!requestUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove from connection requests
    currentUser.connectionRequests = currentUser.connectionRequests.filter(
      id => id.toString() !== requestUser._id.toString()
    );

    // Add to connections for both users
    currentUser.connections.push(requestUser._id);
    requestUser.connections.push(currentUser._id);

    await currentUser.save();
    await requestUser.save();

    // Create notification
    await createNotification(
      requestUser._id,
      currentUser._id,
      'connection_accepted',
      `${currentUser.name} accepted your connection request`,
      '/connections'
    );

    res.json({ message: 'Connection accepted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/users/connections/list
// @desc    Get user connections
// @access  Private
router.get('/connections/list', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('connections', 'name email role branch department company');
    res.json(user.connections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
