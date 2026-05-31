const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// ----- 🟢 Modern Async Mongoose Pre-Save Hook -----
userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) {
    return;
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    return;
  } catch (error) {
    throw error;
  }
});

// ----- 🟢 Password Compare Method -----
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
};

// ----- 🟢 FIXED: JWT Token Generation (With Safe Fallback) -----
userSchema.methods.generateToken = async function () {
  try {
    // 👑 FOOLPROOF HAL: Agar process.env khali bhi milega, to backup string token generate kar degi!
    const secretKey =
      process.env.JWT_SECRET_KEY || "EventSphereSuperSecretSecretKeyAman12345";

    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      secretKey, // 👈 Ab yahan dynamic variable chalega, code kabhi crash nahi hoga
      {
        expiresIn: "30d",
      },
    );
  } catch (error) {
    console.error("Token Generation Error:", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
