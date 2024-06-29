const express = require('express');
const router = express.Router();
const Design = require('../schema/designSchema');

router.get('/', async (req, res) => {
    try {
        const design = await Design.getSingleton();

        res.status(200).json({ message: 'Logo fetched successfully', design });
    } catch (error) {
        console.error('Error fetching logo', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/logo', async (req, res) => {
    try {
        const { text, mode, img } = req.body;

        let design = await Design.getSingleton();

        if (text) design.logo.text = text;
        if (mode) design.logo.mode = mode;
        if (img) design.logo.img = img;

        const updatedDesign = await design.save();

        res.status(200).json({ message: 'Logo updated successfully', design: updatedDesign });
    } catch (error) {
        console.error('Error updating logo', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;