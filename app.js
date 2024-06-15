const express = require('express');
const app = express();
require('dotenv').config();
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const { default: mongoose } = require('mongoose');
const port = process.env.PORT || 2000;
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB', error)
})

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/order', orderRoutes);

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
})  