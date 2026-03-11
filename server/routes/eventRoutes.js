import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('role department');
    const query = { isActive: true };
    
    if (user.role === 'department') {
      query.$or = [{ isActive: true }, { department: user.department }];
    }
    
    const events = await Event.find(query).sort({ date: 1, createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, department, date, location } = req.body;
    const event = await Event.create({ title, description, department, date, location });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
