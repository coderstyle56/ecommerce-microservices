const express = require("express");
const Order = require("../models/Order");
const verifyToken = require("../middleware/authMiddleware");
const { publishOrderCreated } = require("../rabbitmq/rabbitmq"); // ✅ Import RabbitMQ publisher

const router = express.Router();

// ✅ Create Order (Now publishing event to RabbitMQ)
router.post("/create", verifyToken, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        // ✅ Create the order in the database
        const newOrder = new Order({
            userId: req.user.id,
            items,
            totalAmount
        });

        await newOrder.save();

        // ✅ Publish "OrderCreated" event to RabbitMQ (Inventory Service will listen)
        publishOrderCreated({
            orderId: newOrder._id,
            items
        });

        res.status(201).json({ message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



 // ✅ Make sure you are exporting the router correctly


