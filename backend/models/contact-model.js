const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

// 1. Model banayein
const Contact = new model("Contact", contactSchema);

// 2. Sirf 'Contact' export karein (Bina curly braces ke)
module.exports = Contact;
