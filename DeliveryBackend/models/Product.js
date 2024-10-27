const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    "Product ID": { type: Number, required: true, unique: true },
    "Product Name": { type: String, required: true },
    Price: { type: Number, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
