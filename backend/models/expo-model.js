const mongoose = require("mongoose");

const expoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Tech, Fashion
  booths: [
    {
      number: String,
      isBooked: { type: Boolean, default: false },
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Expo = mongoose.model("Expo", expoSchema);
module.exports = Expo;
