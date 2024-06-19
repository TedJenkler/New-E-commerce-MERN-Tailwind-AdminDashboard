const express = require('express');
const router = express.Router();
const Product = require('../schema/productSchema')
const Category = require('../schema/categorySchema');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { name, price, slug, description, features, categoryImage, includes, gallery, others, category, img, newP, shortname } = req.body;

        
        const categoryId = await Category.findOne({ name: category });
        if(!categoryId){
            return res.status(400).json({ message: 'Invalid category name, Create the category first', category });
        }
        
        const newProduct = new Product({
            name, 
            price, 
            slug, 
            description, 
            features, 
            categoryImage, 
            includes, 
            gallery, 
            others, 
            categoryId: categoryId._id,
            img, 
            newP, 
            shortname,
        });

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
        if(!products) {
            return res.status(400).json({ message: 'Cant find any products' })
        }

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

router.put('/update', authenticateToken, async (req, res) => {
    try {
        const { oldSlug, slug, name, price, description, features, categoryImage, includes, gallery, others, category, img, newP, shortname } = req.body;

        if (isNaN(price)) {
            return res.status(400).json({ message: 'Invalid price value' });
        }

        const galleryFields = ['first', 'second', 'third'];
        for (let field of galleryFields) {
            if (typeof gallery[field] !== 'object') {
                return res.status(400).json({ message: `Invalid gallery value for ${field}` });
            }
        }

        const existingProduct = await Product.findOne({ slug: oldSlug });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const categoryId = await Category.findOne({ name: category });
        if (!categoryId) {
            return res.status(400).json({ message: 'Invalid category name, create the category first' });
        }

        existingProduct.slug = slug;
        existingProduct.name = name;
        existingProduct.price = parseFloat(price);
        existingProduct.description = description;
        existingProduct.features = features;
        existingProduct.categoryImage = categoryImage;
        existingProduct.includes = includes;
        existingProduct.gallery = gallery;
        existingProduct.img = img;
        existingProduct.category = categoryId._id;
        existingProduct.newP = newP;
        existingProduct.shortname = shortname;
        existingProduct.others = others;

        await existingProduct.save();

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

router.delete('/delete/:slug', authenticateToken, async (req, res) => {
    try {
        const { slug } = req.params;

        const existingProduct = await Product.findOne({ slug });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const deletedProduct = await Product.findByIdAndDelete(existingProduct._id);
        if (!deletedProduct) {
            return res.status(400).json({ message: 'Product not found or could not be deleted' });
        }

        const category = await Category.findOne({ products: deletedProduct._id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found or product not in category' });
        }

        category.products = category.products.filter(productId => !productId.equals(deletedProduct._id));
        await category.save();

        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;