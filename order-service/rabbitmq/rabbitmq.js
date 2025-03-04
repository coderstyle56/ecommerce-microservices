const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost"; // RabbitMQ runs on localhost by default
const EXCHANGE_NAME = "order_exchange"; // Name of the Exchange

let channel;

// Function to connect to RabbitMQ
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    // Declare an exchange
    await channel.assertExchange(EXCHANGE_NAME, "fanout", { durable: false });
    
    console.log("✅ Connected to RabbitMQ");
  } catch (error) {
    console.error("❌ RabbitMQ Connection Error:", error);
  }
};

// Function to publish a message (Order Created Event)
const publishOrderCreated = (order) => {
  if (!channel) {
    console.error("❌ RabbitMQ channel is not initialized!");
    return;
  }

  const orderMessage = JSON.stringify(order);
  channel.publish(EXCHANGE_NAME, "", Buffer.from(orderMessage));
  console.log(`📩 Order Created Event Published: ${orderMessage}`);
};

module.exports = { connectRabbitMQ, publishOrderCreated };
