const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Experience = require('../models/Experience');
const auth = require('../middleware/auth');

// --- PROJECTS ---
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ priority: -1, createdAt: -1 });
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/projects', auth, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/projects/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) return res.status(404).send();
        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/projects/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).send();
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
});

// --- CERTIFICATES ---
router.get('/certificates', async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.send(certificates);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/certificates', auth, async (req, res) => {
    try {
        const certificate = new Certificate(req.body);
        await certificate.save();
        res.status(201).send(certificate);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/certificates/:id', auth, async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!certificate) return res.status(404).send();
        res.send(certificate);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/certificates/:id', auth, async (req, res) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) return res.status(404).send();
        res.send(certificate);
    } catch (error) {
        res.status(500).send(error);
    }
});

// --- EXPERIENCE ---
router.get('/experience', async (req, res) => {
    try {
        const experience = await Experience.find().sort({ createdAt: -1 });
        res.send(experience);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/experience', auth, async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).send(experience);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/experience/:id', auth, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!experience) return res.status(404).send();
        res.send(experience);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/experience/:id', auth, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(404).send();
        res.send(experience);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
