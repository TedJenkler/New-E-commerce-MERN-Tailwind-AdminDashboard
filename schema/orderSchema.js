const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postal: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
    },
    payOnDelivery: {
        type: Boolean,
        required: true,
    },
    items: Array,
    price: Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;