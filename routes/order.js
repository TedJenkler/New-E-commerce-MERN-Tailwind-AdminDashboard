const express = require('express');
const router = express.Router();
const Order = require('../schema/orderSchema')

router.post("/add", async (req, res) => {
    try {
        const { name, email, phone, address, postal, city, country, paid,  payOnDelivery, items, price} = req.body;

        const newOrder = new Order({
            name,
            email,
            phone,
            address,
            postal,
            city,
            country,
            paid,
            payOnDelivery,
            items,
            price
        })

        await newOrder.save()

        res.status(200).json({ message: 'Order created successfully', order: newOrder })
    }catch (error) {
        console.error('Error creating order', error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;