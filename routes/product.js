const express = require('express');
const router = express.Router();
const Product = require('../schema/productSchema')

router.post('/add', async (req, res) => {
    try {
        const { name, price, slug, isNew, description, features, Image, categoryImage, includes, gallery, others, categoryId, documents } = req.body;
        
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
            documents
        })

        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    }catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error'});
    }
})

router.get('/get', (req, res) => {
    res.send('This gonna get a product')
})

module.exports = router;