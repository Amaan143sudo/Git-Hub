const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  // 🟢 Naya field add kiya
  isApproved: {
    type: Boolean,
    default: false,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);

module.exports = EventRegistration;