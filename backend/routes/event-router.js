const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");
const EventRegistration = require("../models/eventRegister-model");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// PUBLIC ROUTES
router.route("/").get(eventController.getAllEvents);

// DYNAMIC ROUTE KO YAHAN RAKHEIN
router.route("/:id").get(eventController.getEventById); 

// REGISTRATION ROUTES
router.route("/register").post(authMiddleware, async (req, res) => {
    try {
        const { eventTitle } = req.body;
        const { username, email } = req.user;
        if (!eventTitle) return res.status(400).json({ message: "Event title missing!" });
        await EventRegistration.create({ username, email, eventTitle });
        return res.status(201).json({ message: "Registered successfully!" });
    } catch (error) { return res.status(500).json({ message: "Server error" }); }
});

// ADMIN ROUTES
router.route("/create").post(authMiddleware, adminMiddleware, eventController.createEvent);
router.route("/update/:id").put(authMiddleware, adminMiddleware, eventController.updateEvent);
router.route("/delete/event/:id").delete(authMiddleware, adminMiddleware, eventController.deleteEvent);

// Admin: Registration Management
router.route("/all-registrations").get(authMiddleware, adminMiddleware, eventController.getAllRegistrations);
router.route("/delete/registration/:id").delete(authMiddleware, adminMiddleware, eventController.deleteRegistration);

module.exports = router;