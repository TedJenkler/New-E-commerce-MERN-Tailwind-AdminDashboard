const { Schema, SchemaHandler } = require('schema-express');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

});


/*
const validationResult = orderSchema.validate(orderData);
if(validationResult.errors) {
    console.error('Validation errors:', validationResult.errors);
} else {
    console.log('Data is valid')
}   
*/