const express = require('express');
const router = express.Router();
const Product = require('../schema/productSchema')
const Category = require('../schema/categorySchea');

router.post('/add', async (req, res) => {
    try {
        const { name, price, slug, isNew, description, features, Image, categoryImage, includes, gallery, others, categoryName, documents } = req.body;
        
        const categoryId = await Category.findOne({ name: categoryName });
        if(!categoryId){
            return res.status(400).json({ message: 'Invalid categoryName' });
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
            documents
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

router.get('/get', (req, res) => {
    res.send('This gonna get a product')
})

module.exports = router;