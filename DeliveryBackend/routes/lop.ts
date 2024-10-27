


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

        // Fetch products with pagination
        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit);

        // Log the number of products fetched
        console.log("Total Products Fetched:", products.length);

        // Log each product object to check its structure
        products.forEach(product => {
            console.log("Fetched Product:", product); // Log each product object
        });

        // Extract Product IDs, ensuring they are defined
        const productIds = products.map(p => p['Product ID']).filter(id => id !== undefined);
        console.log("Product IDs:", productIds);

        // Get total count for pagination
        const totalCount = await Product.countDocuments(filter);

        // Fetch stock data for all products in one query for efficiency
        const stockData = await Stock.find({ "Product ID": { $in: productIds } });
        console.log("Fetched Stock Data:", stockData); // Log stock data

        // Create a mapping of Product ID to stock availability
        const stockMap = {};
        stockData.forEach(stock => {
            const productId = stock["Product ID"];
            if (productId !== undefined) {
                stockMap[productId] = stock["Stock Available"];
            } else {
                console.warn(`Warning: Stock entry does not have a valid Product ID`);
            }
        });

        console.log("Stock Mapping:", stockMap); // Log the mapping

        // Map products to include stock availability
        const productsWithStock = products.map(product => {
            const productId = product["Product ID"];
            const inStock = stockMap[productId] !== undefined ? stockMap[productId] : false; // Add inStock field
            console.log(`Product ID: ${productId}, In Stock: ${inStock}`); // Log product stock status
            return {
                ...product.toObject(),
                inStock
            };
        });

        res.json({
            products: productsWithStock,
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


