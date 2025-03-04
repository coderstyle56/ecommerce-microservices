const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app=express();
app.use(express.json());

const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/api/inventory", inventoryRoutes);

const { consumeOrderCreated } = require("./rabbitmq/rabbitmq"); // ✅ Import Consumer

// ✅ Start RabbitMQ Consumer to listen for OrderCreated events
consumeOrderCreated();



//connect to MongoDb
mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected for Inventory Service"))
.catch((err)=>console.log("MongoDb Connection Error:",err));

//test API
app.get("/",(req,res)=>{
    res.send("Inventory Service is Running!");
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, "0.0.0.0",()=>{
    console.log(`Inventory Service is running on port ${PORT}`);
});