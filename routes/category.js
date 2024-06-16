const express = require('express');
const router = express.Router();
const Category = require('../schema/categorySchema');
const authenticateToken = require('../middleware/authMiddleware');

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

router.get('/get', async (req, res) => {
    try {
        const categorys = await Category.find()
        res.status(201).json(categorys)
    }catch (error) {
        console.error('Error fetching category:', error);
        res.status().json({ message: 'Internal server error'});
    }
});

router.put('/update/:name', async (req, res) => {
    try {
        const categoryName = req.params.name;
        const { name, img } = req.body;

        const updatedCategory = await Category.findOneAndUpdate(
            { name: categoryName },
            { name, img }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category name updated successfully', category: updatedCategory })
    }catch (error) {
        console.error('Error updating category', error)
        res.status(500).json({ message: 'Internal server error'})
    }
});

router.delete('/delete/:name', async (req, res) =>  {
    try {
        const categoryName = req.params.name;

        const deleteCategory = await Category.findOneAndDelete({ name: categoryName });
        if(!deleteCategory){
            return res.status(404).json({ message: 'Category not found' })
        };

        res.status(200).json({ message: 'Category name deleted successfully', category: deleteCategory})
    }catch (error) {
        console.error('Error deleting category', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router