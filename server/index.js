const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./Routes/userRoutes");
const session_router = require("./Routes/sessionRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://wellness-9d4q.onrender.com"  
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Test Route
app.get("/wellness", (req, res) => {
    res.send("Server is running");
});
connectDB();
app.use("/users",router)
app.use("/session",session_router)

// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
