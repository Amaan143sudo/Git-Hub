const Contact = require("../models/contact-model");

const submitContactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Debugging: Terminal mein check karne ke liye
    console.log("Data Received:", { username, email, message });

    if (!username || !email || !message) {
      return res.status(400).json({ message: "Bhai, saari fields bharein!" });
    }

    // Database mein save karein
    const response = await Contact.create({ username, email, message });
    console.log("Success! Saved in DB:", response);

    return res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    // Ye line terminal mein bata degi ke masla kia hai
    console.error("ASALI ERROR YE HAI ->", error.message);

    return res.status(500).json({
      message: "Server error: message not delivered",
      error: error.message,
    });
  }
};

module.exports = { submitContactForm };
