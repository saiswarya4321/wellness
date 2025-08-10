const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./Routes/userRoutes");
const session_router = require("./Routes/sessionRoutes");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["https://wellness-9d4q.onrender.com", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));



app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB();

app.use("/users", router);
app.use("/session", session_router);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
