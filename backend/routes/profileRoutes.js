const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// GET /api/profile
// Get the profile data (creates default if not exists)
router.get('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile();
            await profile.save();
        }
        res.send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT /api/profile
// Update profile (Protected)
router.put('/', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile();
        }

        if (req.body.resumeUrl !== undefined) {
            profile.resumeUrl = req.body.resumeUrl;
        }

        await profile.save();
        res.send(profile);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
