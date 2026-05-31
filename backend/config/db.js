const mongoose = require("mongoose");

// Cache connection globally taaki Vercel par baar-baar connect na ho
let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const URI = process.env.MONGODB_URI; // Variable use karein, hardcode na karein
    
    // Connection options (TLS bypass included safely)
    cachedConnection = await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: true, // Ye line TLS bypass ka kaam karegi
    });
    
    console.log("🔥 MongoDB Atlas Connected Successfully!");
    return cachedConnection;
  } catch (error) {
    console.error("❌ Connection Failed:", error.message);
    throw error; // Vercel ko batane ke liye ki error hua hai
  }
};

module.exports = connectDB;