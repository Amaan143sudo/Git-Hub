const mongoose = require("mongoose");

// URI ko function ke bahar rakhein taake Syntax ka masla na ho
const URI =
  "mongodb+srv://aman:aman12345@aman.0sjvg1v.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=aman&tlsAllowInvalidCertificates=true";

const connectDB = async () => {
  try {
    // SSL certificate ka temporary bypass
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    await mongoose.connect(URI);
    console.log("🔥 MongoDB Atlas Connected Successfully!");
  } catch (error) {
    console.error("❌ Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
