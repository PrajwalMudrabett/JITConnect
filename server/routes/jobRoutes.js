import express from 'express';
import Job from '../models/Job.js';
import { protect } from '../middleware/auth.js';
import createNotification from '../utils/createNotification.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all active jobs
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { type, workMode, search } = req.query;
    let query = { isActive: true };

    if (type) query.type = type;
    if (workMode) query.workMode = workMode;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email company batch')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email company batch profilePic')
      .populate('applicants', 'name email usn branch year');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/jobs
// @desc    Create new job posting
// @access  Private (Alumni/Faculty)
router.post('/', protect, async (req, res) => {
  try {
    // Only alumni and faculty can post jobs
    if (req.user.role !== 'alumni' && req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Only alumni and faculty can post jobs' });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id
    });

    const populatedJob = await Job.findById(job._id)
      .populate('postedBy', 'name email company batch');

    // Notify all students about new job posting
    const students = await User.find({ role: 'student' });
    for (const student of students) {
      await createNotification({
        recipient: student._id,
        sender: req.user._id,
        type: 'new_job',
        message: `New ${job.type} opportunity: ${job.title} at ${job.company}`,
        link: `/jobs/${job._id}`
      });
    }

    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job posting
// @access  Private (Owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the owner
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    Object.assign(job, req.body);
    await job.save();

    const updatedJob = await Job.findById(job._id)
      .populate('postedBy', 'name email company batch');

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job posting
// @access  Private (Owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the owner
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply to a job
// @access  Private (Students only)
router.post('/:id/apply', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply to jobs' });
    }

    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    job.applicants.push(req.user._id);
    await job.save();

    // Notify job poster
    await createNotification({
      recipient: job.postedBy,
      sender: req.user._id,
      type: 'job_application',
      message: `${req.user.name} applied to your job posting: ${job.title}`,
      link: `/jobs/${job._id}`
    });

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/jobs/my/posted
// @desc    Get jobs posted by current user
// @access  Private
router.get('/my/posted', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate('applicants', 'name email usn branch year')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
