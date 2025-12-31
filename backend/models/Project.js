const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        default: 'Completed'
    },
    features: [{
        type: String
    }],
    image: {
        type: String, // URL to image
        default: ''
    },
    liveLink: {
        type: String,
        default: ''
    },
    gitLink: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
