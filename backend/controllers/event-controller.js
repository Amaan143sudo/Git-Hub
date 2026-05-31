const Event = require("../models/event-model");
const EventRegistration = require("../models/eventRegister-model");
const multer = require("multer");
const fs = require("fs");

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: storage }).single("image");

// --- Event Logic ---
const createEvent = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "Image upload failed" });
    try {
      const { title, description, date, author, location, venue, category } = req.body;
      const newEvent = await Event.create({ title, description, date, author, location, venue, category, image: req.file ? req.file.path : "" });
      res.status(201).json(newEvent);
    } catch (error) { res.status(500).json({ message: "Database creation error" }); }
  });
};

const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) { res.status(500).json({ message: "Update error" }); }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event Deleted" });
  } catch (error) { res.status(500).json({ message: "Delete error" }); }
};

const getAllEvents = async (req, res) => {
  try { const events = await Event.find(); res.status(200).json(events); }
  catch (error) { res.status(500).json({ message: "Error fetching events" }); }
};

// 🟢 Naya Add kiya gaya function
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) { res.status(500).json({ message: "Server error" }); }
};

// --- Registration Logic ---
const registerForEvent = async (req, res) => {
    try {
        const { username, email, eventTitle } = req.body;
        const newRegistration = await EventRegistration.create({ username, email, eventTitle });
        res.status(201).json({ message: "Registered successfully!", data: newRegistration });
    } catch (error) { res.status(500).json({ message: "Registration failed" }); }
};

const getAllRegistrations = async (req, res) => {
    try { const registrations = await EventRegistration.find(); res.status(200).json(registrations); }
    catch (error) { res.status(500).json({ message: "Error fetching registrations" }); }
};

const deleteRegistration = async (req, res) => {
    try {
        await EventRegistration.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) { res.status(500).json({ message: "Delete failed" }); }
};

const approveRegistration = async (req, res) => {
    try {
        const updated = await EventRegistration.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        res.status(200).json({ message: "Registration Approved!", updated });
    } catch (error) { res.status(500).json({ message: "Approval failed" }); }
};

module.exports = { 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getAllEvents, 
    getEventById, // 🟢 Exported
    registerForEvent, 
    getAllRegistrations, 
    deleteRegistration, 
    approveRegistration 
};