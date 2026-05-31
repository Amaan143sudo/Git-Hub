require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose"); // 🔥 Mongoose yahan import karna zaroori hai
const connectDB = require("./config/db");

// Routes import
const authRoute = require("./routes/auth-router");
const contactRoute = require("./routes/contact-router");
const adminRoute = require("./routes/admin-router");
const eventRoute = require("./routes/event-router");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://aapka-frontend-domain.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 DATABASE CONNECTION MIDDLEWARE (Connection Pooling)
app.use(async (req, res, next) => {
  try {
    // Agar pehle se connected nahi hai, tabhi connect karein
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).json({ message: "Database Connection Failed" });
  }
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);
app.use("/api/events", eventRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Vercel export
module.exports = app;

// Local development ke liye
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`🚀 Server running locally on ${PORT}`));
}