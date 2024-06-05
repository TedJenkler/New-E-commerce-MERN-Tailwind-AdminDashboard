const { Schema } = require('schema-express');
const mongoose = require('mongoose');
const { unique } = require('underscore');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

/*
const validationResult = categorySchema.validate(categoryData);
if(validationResult.errors) {
    console.error('Validation errors:', validationResult.errors);
} else {
    console.log('Data is valid')
}
*/

module.exports = mongoose.model('Category', categorySchema);    
