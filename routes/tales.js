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

module.exports = router;