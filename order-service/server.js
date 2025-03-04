const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const { connectRabbitMQ } = require("./rabbitmq/rabbitmq");

// Connect to RabbitMQ when the server starts
connectRabbitMQ();



//connect to Mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Order Service"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


//test api
app.get("/",(req,res)=>{
    res.send("Order Service is runnig!");
});

//Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, ()=>{
    console.log(`Order Service is running on port ${PORT}`);
});