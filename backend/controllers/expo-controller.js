const Expo = require("../models/expo-model");

// Saare events dikhane ke liye
const getAllExpos = async (req, res) => {
  try {
    const expos = await Expo.find();
    res.status(200).json(expos);
  } catch (error) {
    res.status(500).json({ msg: "Server error fetching expos" });
  }
};

// Booth booking logic
const bookBooth = async (req, res) => {
  try {
    const { expoId, boothNumber, userId } = req.body;
    const expo = await Expo.findById(expoId);

    const booth = expo.booths.find((b) => b.number === boothNumber);
    if (booth.isBooked) {
      return res.status(400).json({ msg: "Booth already booked!" });
    }

    booth.isBooked = true;
    booth.bookedBy = userId;
    await expo.save();

    res.status(200).json({ msg: "Booth reserved successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Booking failed" });
  }
};

module.exports = { getAllExpos, bookBooth };
