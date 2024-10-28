// routes/cart.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart");
const Product = require("../models/Product");

const User = require("../models/user");
const authenticate = require("../utils/AuthDecode"); 
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.userId; // Get userId from the decoded token

        // Fetch cart items for the user
        const cartItems = await Cart.find({ userId });

        // Retrieve product details for each cart item
        const productsPromises = cartItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            return {
                ...item.toObject(), // Convert Mongoose document to plain object
                productName: product["Product Name"],
                productPrice: product.Price,
                productImageUrl: product.imageUrl,
            };
        });

        const itemsWithDetails = await Promise.all(productsPromises);
        console.log()
        res.status(200).json({ items: itemsWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cart items.' });
    }
});

router.delete('/remove/:id', authenticate, async (req, res) => {
    try {
        const cartItemId = req.params.id;

        // Remove the cart item from the database
        const result = await Cart.deleteOne({ _id: cartItemId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post("/add", authenticate, async (req, res) => {
  try {
    console.log('reached');
    
    const authHeader = req.headers['authorization']; 
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "JWT token is missing." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded token to check its structure
    
    // Correctly assign userId from decoded token
    const userId = decoded.userId; 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID not found in token." });
    }

    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const existingCartItem = await Cart.findOne({ userId, productId });
    
    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
    } else {
      const newCartItem = new Cart({
        userId, // Ensure userId is correctly set
        productId,
        quantity: quantity || 1
      });
      await newCartItem.save();
    }

    res.status(201).json({ message: "Item added to cart successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart." });
  }
});




module.exports = router;
