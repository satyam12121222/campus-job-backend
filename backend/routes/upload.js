const express = require('express');
const multer = require('multer');
const path = require('path');
const protect = require('../middlewares/authMiddleware');
const User = require('../models/user');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, req.user.id + '_resume' + ext);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

// POST /api/upload/resume
router.post('/resume', protect, upload.single('resume'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.resume = req.file.path;
        await user.save();
        res.status(200).json({ message: 'Resume uploaded successfully', resume: user.resume });
    } catch (err) {
        res.status(500).json({ message: 'Upload failed' });
    }
});

module.exports = router; 