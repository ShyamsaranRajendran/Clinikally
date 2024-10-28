const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    "Product ID": {
        type: Number,
        required: true,
        unique: true
    },
    "Product Name": {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
