const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        mobile: String,
        tablet: String,
        desktop: String
    },
    price: {
        type: Number,
        required: true
    },
    slug: String,
    description: String,
    features: String,
    categoryImage: {
        mobile: String,
        tablet: String,
        desktop: String
    },
    includes: [{
        quantity: Number,
        item: String
    }],
    gallery: {
        first: {
            mobile: String,
            tablet: String,
            desktop: String
        },
        second: {
            mobile: String,
            tablet: String,
            desktop: String
        },
        third: {
            mobile: String,
            tablet: String,
            desktop: String
        }
    },
    others: [{
        slug: String,
        name: String,
        image: {
            mobile: String,
            tablet: String,
            desktop: String
        }
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    newP: Boolean,
    shortname: String
});

module.exports = mongoose.model('Product', productSchema);
