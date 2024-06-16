const { Schema } = require('schema-express');
const mongoose = require('mongoose');
const { unique } = require('underscore');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    img: {}
});

module.exports = mongoose.model('Category', categorySchema);    
