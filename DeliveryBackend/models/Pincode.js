const mongoose = require('mongoose');

const PincodeSchema = new mongoose.Schema({
    "Pincode": { type: Number, required: true, unique: true }, // Pincode as a unique number
    "Logistics Provider": { type: String, required: true },    // Logistics provider's name
    "TAT": { type: Number, required: true }                    // TAT as a required number
});


module.exports = mongoose.model('Pincode', PincodeSchema);
