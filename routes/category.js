const express = require('express');
const router = express.Router();
const Category = require('../schema/categorySchea');

router.post('/add', async (req, res) => {
    try {
        const { name, products } = req.body;

        const newCategory = new Category({
            name,
            products
        })

        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    }catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error'});
    }
});

module.exports = router