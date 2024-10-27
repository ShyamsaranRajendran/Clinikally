const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Pincode = require('../models/Pincode');
const Stock = require('../models/stocks');
const Order = require('../models/order');
// Function to calculate estimated delivery date
const calculateDeliveryDate = (daysToDeliver) => {
    if (typeof daysToDeliver !== 'number' || isNaN(daysToDeliver)) {
        throw new Error("Invalid TAT value: daysToDeliver should be a valid number");
    }
    
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToDeliver);
    return currentDate.toISOString().split('T')[0];
};

/// Route to estimate delivery date
router.post('/estimateDeliveryDate', async (req, res) => {
    const { productId, pincode } = req.body;
    console.log(`Received request with Product ID: ${productId}, Pincode: ${pincode}`);

    if (!productId || !pincode) {
        return res.status(400).json({ error: 'Product ID and pincode are required' });
    }

    try {
        // Fetch product by ID
        const product = await Product.findOne({ "Product ID": productId });
        if (!product) {
            console.log(`Product not found for Product ID: ${productId}`);
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log(`Fetched Product: ${JSON.stringify(product)}`);

        // Fetch pincode data, ensuring pincode is queried as a string
        const pincodeData = await Pincode.findOne({ Pincode: String(pincode) });
        if (!pincodeData) {
            console.log(`Pincode not serviced for Pincode: ${pincode}`);
            return res.status(404).json({ error: 'Pincode not serviced' });
        }
        console.log(`Fetched Pincode Data: ${JSON.stringify(pincodeData)}`);

        const daysToDeliver = Number(pincodeData.TAT);
        if (isNaN(daysToDeliver)) {
            console.error(`Invalid TAT value for pincode ${pincode}:`, pincodeData.TAT);
            return res.status(400).json({ error: 'Invalid TAT value for this pincode' });
        }

        const estimatedDeliveryDate = calculateDeliveryDate(daysToDeliver);
        res.json({ estimatedDeliveryDate });
    } catch (error) {
        console.error('Server error while estimating delivery date:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/confirmOrder', async (req, res) => {
  const { productId, address, pincode, name, phoneNumber } = req.body;

  if (!productId || !address || !pincode || !name || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newOrder = new Order({
      productId,
      address,
      pincode,
      name,
      phoneNumber,
      orderDate: new Date(),
      status: 'Pending',
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order confirmed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to confirm order. Please try again later.' });
  }
});



// Route to fetch products with pagination and search
// router.get('/product', async (req, res) => {
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const skip = (page - 1) * limit;
//     const searchQuery = req.query.search || '';

//     try {
//         // Create filter for search
//         const filter = searchQuery
//             ? { "Product Name": { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
//             : {};

//         // Fetch products with pagination
//         const products = await Product.find(filter).skip(skip).limit(limit);
        
//         // Get total count for pagination
//         const totalCount = await Product.countDocuments(filter);

//         res.json({ 
//             products, 
//             pagination: {
//                 total: totalCount,
//                 page,
//                 pageSize: limit,
//                 totalPages: Math.ceil(totalCount / limit),
//             }
//         });
//     } catch (error) {
//         console.error("Failed to fetch products:", error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


// Route to fetch products with pagination and search
// router.get('/product', async (req, res) => {
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const skip = (page - 1) * limit;
//     const searchQuery = req.query.search || '';

//     try {
//         // Create filter for search
//         const filter = searchQuery
//             ? { "Product Name": { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
//             : {};

//         // Fetch products with pagination
//         const products = await Product.find(filter).skip(skip).limit(limit);
        
//         // Get total count for pagination
//         const totalCount = await Product.countDocuments(filter);

//         res.json({ 
//             products, 
//             pagination: {
//                 total: totalCount,
//                 page,
//                 pageSize: limit,
//                 totalPages: Math.ceil(totalCount / limit),
//             }
//         });
//     } catch (error) {
//         console.error("Failed to fetch products:", error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

router.get('/product', async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || '';

    try {
        // Create filter for search
        const filter = searchQuery
            ? { "Product Name": { $regex: searchQuery, $options: 'i' } } // Case-insensitive search
            : {};

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit);

        console.log("Total Products Fetched:", products.length);

        const productIds = products.map(p => p['Product ID']).filter(id => id !== undefined);
        console.log("Product IDs:", productIds);
        const totalCount = await Product.countDocuments(filter);

        const stockData = await Stock.find({ "Product ID": { $in: productIds } });
        console.log("Fetched Stock Data:", stockData); 
        const stockMap = {};
        stockData.forEach(stock => {
            const productId = stock["Product ID"];
            if (productId !== undefined) {
                stockMap[productId] = stock["Stock Available"];
            } else {
                console.warn(`Warning: Stock entry does not have a valid Product ID`);
            }
        });

        console.log("Stock Mapping:", stockMap); 
        const productsWithStock = products.map(product => {
            const productId = product["Product ID"];
            const inStock = stockMap[productId] !== undefined ? stockMap[productId] : false; 
            console.log(`Product ID: ${productId}, In Stock: ${inStock}`); 
            return {
                ...product.toObject(),
                inStock
            };
        });
        const sortedProducts = productsWithStock.sort((a, b) => {
            return b.inStock - a.inStock; 
        });

        res.json({
            products: sortedProducts,
            pagination: {
                total: totalCount,
                page,
                pageSize: limit,
                totalPages: Math.ceil(totalCount / limit),
            }
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        res.status(500).json({ error: 'Server error' });
    }
});









module.exports = router;
