const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const estimateRoute = require('./routes/main.js');
const user = require('./routes/users.js');
const cart = require('./routes/cart.js');
dotenv.config();

connectDB();

const app = express();
app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.use('/api', estimateRoute);
app.use('/user', user);
app.use('/cart',cart);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
