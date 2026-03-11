import express from 'express';
import Research from '../models/Research.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('role');
    const query = { isActive: true };
    
    if (user.role === 'faculty') {
      query.$or = [{ isActive: true }, { facultyMember: req.user._id }];
    }
    
    const researchProjects = await Research.find(query)
      .populate('facultyMember', 'name email department designation');
    res.json(researchProjects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, department, skillsNeeded } = req.body;
    const research = await Research.create({
      title, description, facultyMember: req.user._id, department, skillsNeeded: skillsNeeded || []
    });
    const populated = await Research.findById(research._id).populate('facultyMember', 'name email department designation');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/apply', protect, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ message: 'Research project not found' });
    if (research.studentsApplied.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already applied' });
    }
    research.studentsApplied.push(req.user._id);
    await research.save();
    res.json({ message: 'Application submitted successfully', research });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ message: 'Research project not found' });
    if (!req.user.isAdmin && research.facultyMember.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await research.deleteOne();
    res.json({ message: 'Research project deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
