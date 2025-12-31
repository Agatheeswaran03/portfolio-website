const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolioDB';
const Certificate = require('./models/Certificate');

const migrate = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to DB");

        const certificates = await Certificate.find({});
        console.log(`Found ${certificates.length} certificates.`);

        for (const cert of certificates) {
            console.log(`Processing: ${cert.title}`);

            // Check if image is local
            // It might be stored as "/uploads/filename" or "http://localhost:5000/uploads/filename"
            let localFilename = null;

            if (cert.image && cert.image.includes('/uploads/')) {
                const parts = cert.image.split('/uploads/');
                if (parts.length > 1) {
                    localFilename = parts[1];
                }
            }

            if (localFilename) {
                const localPath = path.join(__dirname, 'uploads', localFilename);

                if (fs.existsSync(localPath)) {
                    console.log(`   Uploading ${localFilename} to Cloudinary...`);
                    try {
                        const result = await cloudinary.uploader.upload(localPath, {
                            folder: 'portfolio_certificates',
                            use_filename: true,
                            unique_filename: false
                        });

                        console.log(`   ✅ Uploaded: ${result.secure_url}`);

                        // Update DB
                        cert.image = result.secure_url;
                        await cert.save();
                        console.log(`   ✅ Database updated.`);

                    } catch (uploadErr) {
                        console.error(`   ❌ Upload failed: ${uploadErr.message}`);
                    }
                } else {
                    console.warn(`   ⚠️ Local file not found: ${localPath}`);
                }
            } else {
                console.log(`   Skipping (already remote or no image): ${cert.image}`);
            }
        }

        console.log("Migration complete.");
        process.exit(0);

    } catch (err) {
        console.error("Migration Error:", err);
        process.exit(1);
    }
};

migrate();
