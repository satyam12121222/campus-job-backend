const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const protect = require('../middlewares/authMiddleware');

// GET /api/students/applied-jobs - Student's applied jobs
router.get('/applied-jobs', protect, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can view this' });
        }

        const jobs = await Job.find({ applicants: req.user.id })
            .select('title location stipend duration approved')
            .sort({ createdAt: -1 });

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router; 