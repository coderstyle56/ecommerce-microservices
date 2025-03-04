const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true }
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
