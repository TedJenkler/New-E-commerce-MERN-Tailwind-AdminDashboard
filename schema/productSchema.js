const { Schema } = require('schema-express')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({   
    name: String,
    price: Number,
    slug: String,
    isNew: Boolean,
    description: String,
    features: String,
    Image: [{ mobile: String, tablet: String, desktop: String }],
    categoryImage: [{ mobile: String, tablet: String, desktop: String }],
    includes: [],
    gallery: { first: Object, second: Object, third: Object },
    others: [],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document'}]
});

/* const validationResult = productSchema.validate(productData);
if(validationResult.errors) {
    console.error('Validation errors:', validationResult.errors);
} else {
    console.log('Data is valid')
}

*/

module.exports = mongoose.model('Product', productSchema);