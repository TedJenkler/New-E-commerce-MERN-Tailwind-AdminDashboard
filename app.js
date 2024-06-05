const express = require('express');
const app = express();
require('dotenv').config();
const productRoutes = require('./routes/product')
const port = process.env.PORT || 2000;

app.use('/product', productRoutes);

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
})