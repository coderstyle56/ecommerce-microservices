const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); //Load environemnt variables

const app= express();
app.use(express.json());
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


//connect to mongoDb

mongoose
  .connect(process.env.MONGO_URI)

.then(()=>console.log("MongoDb Connected"))
.catch((err)=>console.log("MongoDb Connection Error:",err));

//Test api
app.get("/", (req, res) => {
    console.log("Received a request at /"); // ✅ Add this log
    res.send("User Service is Running!");
});


//Start Server
const PORT = 5005;
app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is Runnig on port ${PORT}`);
});