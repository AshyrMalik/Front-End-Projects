
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// File upload route
router.post('/upload', 
    upload.fields([
        { name: 'attendance', maxCount: 1 },
        { name: 'overtime', maxCount: 1 },
        { name: 'additional', maxCount: 5 }
    ]), 
    async (req, res) => {
        try {
            console.log('Files received:', req.files);
            
            // Here you can add file processing logic
            
            res.json({
                message: 'Files uploaded successfully',
                files: {
                    attendance: req.files.attendance ? req.files.attendance[0].filename : null,
                    overtime: req.files.overtime ? req.files.overtime[0].filename : null,
                    additional: req.files.additional ? req.files.additional.map(f => f.filename) : []
                }
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;