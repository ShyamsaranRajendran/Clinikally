const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true 
  },
  "Product ID": {
    type: Number,
    required: true,
    unique: true
  },
  "Stock Available": {
    type: Boolean,
    default: true 
  }
});

const Product = mongoose.model('stocks', productSchema);

module.exports = Product;
