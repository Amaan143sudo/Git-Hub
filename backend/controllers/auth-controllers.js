const User = require("../models/user-model");
const Booking = require("../models/booking-model"); // 🟢 Imported the new booking model

// ==========================================
// 1. HOME FUNCTION
// ==========================================
const home = async (req, res, next) => {
  try {
    return res.status(200).send("Welcome to EventSphere Backend Hub!");
  } catch (error) {
    console.error("Home Error:", error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// ==========================================
// 2. REGISTER FUNCTION
// ==========================================
const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    // Email checking in database
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Creating new user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    // Generating JWT Token
    const token = await userCreated.generateToken();

    return res.status(201).json({
      msg: "Registration Successful",
      token: token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    if (next) return next(error);
    return res
      .status(500)
      .json({ msg: error.message || "Registration failed" });
  }
};

// ==========================================
// 3. LOGIN FUNCTION
// ==========================================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Email validation
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Password validation using custom instance method
    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      const token = await userExist.generateToken();

      return res.status(200).json({
        msg: "Login Successful",
        token: token,
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    return res
      .status(500)
      .json({ msg: error.message || "Internal server error during login" });
  }
};

// ==========================================
// 4. FORGOT PASSWORD FUNCTION
// ==========================================
const forgotPassword = async (req, res, next) => {
  try {
    return res.status(200).json({ msg: "Forgot Password route coming soon!" });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// ==========================================
// 5. GET LOGGED-IN USER LOGIC (Bulletproof Patch)
// ==========================================
const user = async (req, res, next) => {
  try {
    const userData = req.user; // Yeh data authMiddleware se inject ho kar aata hai

    // SAFE CHECK: Agar kisi race condition ki wajah se data na mile, to server crash nahi hoga
    if (!userData) {
      return res
        .status(401)
        .json({ msg: "Unauthorized. User data missing from request context." });
    }

    // Ekdum clean structure mein response bhein ge
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error from user logic: ${error.message}`);
    return res
      .status(500)
      .json({ msg: "Internal Server Error in User Controller" });
  }
};

// ==========================================
// 🟢 6. BOOK CUSTOM EVENT FUNCTION (NEWLY ADDED)
// ==========================================
const bookCustomEvent = async (req, res, next) => {
  try {
    const {
      eventType,
      customEventName,
      eventDate,
      guestCount,
      venuePreference,
      servicesRequired,
      additionalNotes,
    } = req.body;

    // Secure Check: Ensure authMiddleware has successfully verified user context
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ msg: "Unauthorized. Valid token required to book an event." });
    }

    const userId = req.user._id;

    // Creating entry in the customized booking collection
    const newBooking = await Booking.create({
      user: userId,
      eventType,
      customEventName,
      eventDate,
      guestCount,
      venuePreference,
      servicesRequired, // Holds specific booleans for catering, decorations, sound system, etc.
      additionalNotes,
    });

    return res.status(201).json({
      success: true,
      message: "Event booking request submitted successfully! 🎉",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Custom Booking Controller Error:", error.message);
    return res.status(500).json({
      msg:
        error.message ||
        "Failed to process the custom layout configuration request.",
    });
  }
};

// Module export list updated with bookCustomEvent
module.exports = {
  home,
  register,
  login,
  forgotPassword,
  user,
  bookCustomEvent,
};
