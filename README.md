E-commerce Microservices Backend🚀 

Project Overview
This is a scalable microservices-based e-commerce backend built using Node.js, Express.js, and MongoDB. It consists of three main services:
User Service – Manages user authentication & accounts.
Order Service – Handles order placement & management.
Inventory Service – Manages product stock & updates inventory.
The services communicate synchronously via REST APIs and asynchronously via RabbitMQ message queues for better scalability.


🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (separate DB per service)
Messaging Queue: RabbitMQ (for async communication)
Authentication & Security: JWT, bcrypt.js
API Testing: Postman
Version Control: Git, GitHub


⚙️ Microservices Architecture
Each microservice is independent, has its own database, and communicates via REST APIs and RabbitMQ:
User Service: Handles authentication, user creation, and login.
Order Service: Places orders and interacts with the inventory.
Inventory Service: Listens to order events and updates stock accordingly.

🔄 Service Communication Flow
✅ Order Service publishes an event (OrderCreated) to RabbitMQ when a new order is placed.
✅ Inventory Service listens to this event and updates stock accordingly.
✅ This ensures loose coupling and asynchronous processing for better scalability.

🚀 Installation & Setup
1️⃣ Clone the Repositorygit clone https://github.com/coderstyle56/ecommerce-microservices.git
cd ecommerce-microservices
2️⃣ Install DependenciesRun the following in each microservice folder (user-service, order-service, inventory-service):
npm install
3️⃣ Start RabbitMQ (Make sure RabbitMQ is installed)rabbitmq-server
4️⃣ Start Each ServiceRun the following in separate terminals:
cd user-service && nodemon server.js
cd order-service && nodemon server.js
cd inventory-service && nodemon server.js
🛠️ API Endpoints
User Service (Port 5001)
POST /api/users/register – Register a new user
POST /api/users/login – Login and get a JWT token
Order Service (Port 5002)
POST /api/orders/create – Create an order (JWT required)
GET /api/orders/ – Get all orders
Inventory Service (Port 5003)
GET /api/inventory/:productId – Check product stock
PUT /api/inventory/:productId – Update stock
📩 How RabbitMQ Works in This Project
Order Service publishes an OrderCreated event to the orderCreatedQueue.
Inventory Service consumes this event and updates the stock in MongoDB.
This event-driven architecture improves reliability and scalability.
🔹 Exchange Type Used: fanout
This allows the event to be broadcasted to multiple queues if needed in the future.

🔥 Future Improvements
✅ Implement Circuit Breaker Pattern to handle failures.
✅ Add rate limiting to prevent API abuse.
✅ Deploy on AWS with Docker & Kubernetes.
