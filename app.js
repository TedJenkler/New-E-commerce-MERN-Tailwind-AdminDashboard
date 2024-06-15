const express = require('express');
const app = express();
require('dotenv').config();
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const { default: mongoose } = require('mongoose');
const port = process.env.PORT || 2000;
const cors = require('cors')
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/client/dist')))

// Serve images from src/assets
app.use('/assets', express.static(path.join(__dirname, 'client', 'src', 'assets')));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB', error)
})

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/order', orderRoutes);


// Example route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
})  