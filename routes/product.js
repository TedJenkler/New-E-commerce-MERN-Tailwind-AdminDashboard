const express = require('express');
const router = express.Router();
const Product = require('../schema/productSchema')
const Category = require('../schema/categorySchema');

router.post('/add', async (req, res) => {
    try {
        const { name, price, slug, isNew, description, features, Image, categoryImage, includes, gallery, others, category } = req.body;
        
        const categoryId = await Category.findOne({ name: category });
        if(!categoryId){
            return res.status(400).json({ message: 'Invalid category name, Create the category first', category });
        }
        
        const newProduct = new Product({
            name, 
            price, 
            slug, 
            isNew, 
            description, 
            features, 
            Image, 
            categoryImage, 
            includes, 
            gallery, 
            others, 
            categoryId,
        })

        await newProduct.save();

        categoryId.products.push(newProduct._id);
        await categoryId.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    }catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error'});
    }
})

router.get('/get', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    }catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id).populate('categoryId');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;