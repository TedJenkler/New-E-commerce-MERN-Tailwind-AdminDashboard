const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
    res.send('This gonna create a product')
})

router.get('/get', (req, res) => {
    res.send('This gonna get a product')
})

module.exports = router;