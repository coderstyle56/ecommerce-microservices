const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

    try {
        const decoded = jwt.verify(token, "your_jwt_secret");
        req.user = decoded; // Store user data in request
        next(); // Continue to the next middleware/controller
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = verifyToken;

