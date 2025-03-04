const amqp = require("amqplib");
const Inventory = require("../models/Inventory"); // Import Inventory model

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "orderCreatedQueue"; 
const EXCHANGE_NAME = "order_exchange"; // Match with order-service exchange

async function consumeOrderCreated() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        // Declare the exchange (must match the order-service exchange)
        await channel.assertExchange(EXCHANGE_NAME, "fanout", { durable: false });

        // Declare the queue
        await channel.assertQueue(QUEUE_NAME, { durable: false });

        // Bind the queue to the exchange
        await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, "");

        console.log("✅ Waiting for OrderCreated events...");

        channel.consume(QUEUE_NAME, async (msg) => {
            const { orderId, items } = JSON.parse(msg.content.toString());
            console.log(`📩 Received OrderCreated event for Order ID: ${orderId}`);

            // ✅ Update Inventory
            for (let item of items) {
                const product = await Inventory.findOne({ productId: item.productId });
                if (product && product.quantity >= item.quantity) {
                    product.quantity -= item.quantity;
                    await product.save();
                    console.log(`✅ Inventory updated for Product ID: ${item.productId}`);
                } else {
                    console.log(`❌ Not enough stock for Product ID: ${item.productId}`);
                }
            }

            channel.ack(msg); // Acknowledge message after processing
        });

    } catch (error) {
        console.error("❌ Error in RabbitMQ Consumer:", error);
    }
}

consumeOrderCreated();

module.exports = { consumeOrderCreated };

