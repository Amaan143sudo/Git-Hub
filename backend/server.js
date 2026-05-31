require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // path import karna zaroori hai
const connectDB = require("./config/db");

const authRoute = require("./routes/auth-router");
const contactRoute = require("./routes/contact-router");
const adminRoute = require("./routes/admin-router");
const eventRoute = require("./routes/event-router");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://aapka-frontend-domain.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Database Connection Logic (Cached)
const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return await connectDB();
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await dbConnection();
    next();
  } catch (err) {
    console.error("DB Middleware Error:", err);
    return res.status(500).json({ message: "Database Connection Failed" });
  }
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);
app.use("/api/events", eventRoute);

// Root route (Cannot GET / fix karne ke liye)
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Local Dev support
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
}

module.exports = app;