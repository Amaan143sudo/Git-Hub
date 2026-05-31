const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  // 🟢 Safer Token Extraction
  const jwtToken = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    
    const userData = await User.findOne({ email: isVerified.email }).select("-password");

    if (!userData) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;
    next();
  } catch (error) {
    // 🟢 Token invalid/expired ho toh clean error
    return res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

module.exports = authMiddleware;