const adminOnly = require('../middlewares/adminMiddleware');

// GET /api/jobs/pending - Admin: Get all unapproved jobs
router.get('/pending', protect, adminOnly, async (req, res) => {
    try {
        const jobs = await Job.find({ approved: false }).populate('createdBy', 'name email');
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/jobs/:id/approve - Admin: Approve job
router.put('/:id/approve', protect, adminOnly, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        job.approved = true;
        await job.save();

        res.status(200).json({ message: "Job approved", job });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/jobs/:id/apply - Student applies to a job
router.post('/:id/apply', protect, async (req, res) => {
    try {
        // Only students can apply
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can apply' });
        }

        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        if (!job.approved) return res.status(400).json({ message: "Job not yet approved" });

        // Prevent re-application
        if (job.applicants.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already applied' });
        }

        job.applicants.push(req.user.id);
        await job.save();

        res.status(200).json({ message: 'Application successful' });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/jobs/:id/applicants - Employer views applicants for their job
router.get('/:id/applicants', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('applicants', 'name email');

        if (!job) return res.status(404).json({ message: "Job not found" });

        // Only the employer who created the job can view applicants, or admin
        if (job.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json({
            jobTitle: job.title,
            applicants: job.applicants
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}); 