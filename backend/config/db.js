const mongoose = require("mongoose");

// Cache connection globally
let cachedConnection = null;

const connectDB = async () => {
  // Agar pehle se connection hai, toh wahi use karein
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const URI = "mongodb+srv://aman:aman12345@aman.0sjvg1v.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=aman&tlsAllowInvalidCertificates=true";
    
    // Connection options add karein
    cachedConnection = await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log("🔥 MongoDB Atlas Connected Successfully!");
    return cachedConnection;
  } catch (error) {
    console.error("❌ Connection Failed:", error.message);
    // Yahan exit nahi karna hai, Vercel handle karega
    throw error; 
  }
};

module.exports = connectDB;