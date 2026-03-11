import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';
import createNotification from '../utils/createNotification.js';

const router = express.Router();

// @route   GET /api/messages/:userId
// @desc    Get messages with a specific user
// @access  Private
router.get('/:userId', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    })
      .populate('sender', 'name role')
      .populate('receiver', 'name role')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/messages
// @desc    Send a message
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { receiver, message } = req.body;

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name role')
      .populate('receiver', 'name role');

    // Create notification for receiver
    await createNotification(
      receiver,
      req.user._id,
      'new_message',
      `${req.user.name} sent you a message`,
      '/messages',
      { relatedMessage: newMessage._id }
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/messages/conversations/list
// @desc    Get all conversations
// @access  Private
router.get('/conversations/list', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
      .populate('sender', 'name role')
      .populate('receiver', 'name role')
      .sort({ createdAt: -1 });

    // Get unique conversations
    const conversations = [];
    const userIds = new Set();

    messages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === req.user._id.toString() 
        ? msg.receiver 
        : msg.sender;
      
      if (!userIds.has(otherUser._id.toString())) {
        userIds.add(otherUser._id.toString());
        conversations.push({
          user: otherUser,
          lastMessage: msg.message,
          timestamp: msg.createdAt
        });
      }
    });

    res.json(conversations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
