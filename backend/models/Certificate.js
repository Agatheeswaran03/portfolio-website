const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    issuer: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String, // e.g., "Dec 2023"
        required: true
    },
    type: {
        type: String, // e.g., "Course", "Workshop"
        default: 'Course'
    },
    image: {
        type: String, // URL
        default: ''
    },
    link: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
