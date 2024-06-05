const { Schema } = require('schema-express')
const mongoose = require('mongoose')

const productSchema = new SchemaHandler({
    name: String,
    price: Number,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document'}]
});

const validationResult = productSchema.validate(productData);
if(validationResult.errors) {
    console.error('Validation errors:', validationResult.errors);
} else {
    console.log('Data is valid')
}