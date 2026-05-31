const express = require("express");
const router = express.Router();
// Curly braces lazmi lagayein warna server crash ho jayega
const { submitContactForm } = require("../controllers/contact-controller");

router.route("/contact").post(submitContactForm);

module.exports = router;