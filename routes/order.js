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
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const orders = await Order.find();
        if(!orders) {
            return res.status(400).json({ message: 'Cant find any orders' })
        }
        
        res.status(200).json({ message: 'Order fetched successfully', order: orders })
    }catch (error) {
        console.error('Error getting orders', error);
        res.status(500).json( { message: 'Internal Server Error' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(400).json({ message: 'Cannot find that order' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order: order });
    } catch (error) {
        console.error('Error deleting order', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;