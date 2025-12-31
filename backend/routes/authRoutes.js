const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// REGISTER (One-time use or protected)
router.post('/register', async (req, res) => {
    try {
        // Optional: Check if admin already exists to prevent multiple admins
        const existingAdmin = await User.countDocuments();
        if (existingAdmin > 0) {
            // Allow for now, or restriction logic here.
            // return res.status(403).send({ error: 'Admin already exists' });
        }

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User created' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this', { expiresIn: '7d' });
        res.send({ user: { username: user.username }, token });
    } catch (error) {
        res.status(500).send(error);
    }
});

// VERIFY TOKEN
router.get('/me', auth, async (req, res) => {
    res.send({ valid: true });
});

module.exports = router;
