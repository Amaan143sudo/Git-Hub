require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const authRoute = require("./routes/auth-router");
const contactRoute = require("./routes/contact-router");
const adminRoute = require("./routes/admin-router");
const eventRoute = require("./routes/event-router");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://aapka-frontend-domain.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// ⚠️ Agar uploads folder Vercel par nahi mil raha, toh ise comment kar dein
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 Database Middleware
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    return res.status(500).json({ message: "Database Connection Failed" });
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

module.exports = app;

// Local Dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
}