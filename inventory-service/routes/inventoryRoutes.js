const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

// ✅ Create a new product in inventory
router.post("/add", async (req, res) => {
    try {
        const { productName, productId, quantity, price } = req.body;
        const newProduct = new Inventory({ productName, productId, quantity, price });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get all products from inventory
router.get("/", async (req, res) => {
    try {
        const products = await Inventory.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get product by ID
router.get("/:productId", async (req, res) => {
    try {
        const product = await Inventory.findOne({ productId: req.params.productId });
        if (!product) return res.status(404).json({ message: "Product not found!" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update product stock
router.put("/:productId", async (req, res) => {
    try {
        const { quantity } = req.body;
        const product = await Inventory.findOneAndUpdate(
            { productId: req.params.productId },
            { $set: { quantity } },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: "Product not found!" });
        res.json({ message: "Stock updated!", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a product
router.delete("/:productId", async (req, res) => {
    try {
        const product = await Inventory.findOneAndDelete({ productId: req.params.productId });
        if (!product) return res.status(404).json({ message: "Product not found!" });
        res.json({ message: "Product deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
