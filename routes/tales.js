const express = require('express')

const auth = require('../middlewares/auth');
const Tale = require("../models/Tale");
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    const userId = req.user.userId;

    try {
        const newTale = new Tale({
            title: title || 'Untitled Tale',
            content: content,
            user: userId
        });

        const tale = await newTale.save();

        res.status(201).json(tale);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async (req, res) => {
    const userId = req.user.userId;

    try {
        let userTales = await Tale.find({ user: userId }).sort({ createdDate: -1 });

        res.json(userTales);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const tale = await Tale.findById(req.params.id);

        // Check if the tale exists at all
        if (!tale) {
            return res.status(404).json({ msg: 'Tale not found' });
        }

        // Security Check: Make sure the logged-in user owns this tale
        if (tale.user.toString() !== req.user.userId) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Success
        res.json(tale);

    } catch (err) {
        console.error(err.message);
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tale not found' });
        }
        res.status(500).send('Server Error');
    }
});

router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        // Find the tale by its ID
        let tale = await Tale.findById(req.params.id);

        if (!tale) {
            return res.status(404).json({ msg: 'Tale not found' });
        }

        // Security Check: Make sure the logged-in user owns this tale
        if (tale.user.toString() !== req.user.userId) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update the tale
        tale = await Tale.findByIdAndUpdate(
            req.params.id,
            { $set: { title: title || 'Untitled Tale', content: content } },
            { new: true }
        );

        res.json(tale); // Send back the updated tale
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Tale not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;