const express = require("express");
const router = express.Router();

let authController;

try {
  // Try 5: Agar folder ka naam 'Controllers' (Capital C) hai
  authController = require("../Controllers/auth-controller");
} catch (e5) {
  try {
    // Try 6: Agar file ke naam mein bhi 's' hai (auth-controllers)
    authController = require("../controllers/auth-controllers");
  } catch (e6) {
    try {
      // Try 7: Agar file sirf 'auth' naam ki hai
      authController = require("../controllers/auth");
    } catch (e7) {
      console.error(
        "❌ Bhai abhi bhi path nahi mila! Please left side panel dekh kar folder/file ka naam batao.",
      );
      process.exit(1);
    }
  }
}

const authMiddleware = require("../middlewares/auth-middleware");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
