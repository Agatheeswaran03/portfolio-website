const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    period: {
        type: String, // e.g., "Jan 2023 - Present"
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String, // "Internship", "Full-time", "Freelance"
        default: "Internship"
    },
    certificateImage: {
        type: String, // URL to certificate image
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
