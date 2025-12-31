const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Check file type to determine format and resource type
        const isPdf = file.mimetype === 'application/pdf';
        return {
            folder: 'portfolio_assets',
            format: isPdf ? 'pdf' : undefined, // let Cloudinary detect image format
            resource_type: isPdf ? 'raw' : 'image', // Use 'raw' for PDFs to avoid transformation issues usually
            public_id: file.originalname.split('.')[0] + '-' + Date.now()
        };
    },
});

const upload = multer({ storage: storage });

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        // Return the secure Cloudinary URL
        res.send({
            success: true,
            imageUrl: req.file.path // Cloudinary returns the URL in 'path'
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
