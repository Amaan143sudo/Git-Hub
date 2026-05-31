const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const eventController = require("../controllers/event-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// --- User Routes ---
router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// --- Contact Routes ---
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

// --- Event Routes ---
router.route("/events/create").post(authMiddleware, adminMiddleware, eventController.createEvent);
router.route("/events/update/:id").patch(authMiddleware, adminMiddleware, eventController.updateEvent);
router.route("/events/delete/:id").delete(authMiddleware, adminMiddleware, eventController.deleteEvent);

// --- Registration Management Routes ---
router.route("/registrations").get(authMiddleware, adminMiddleware, eventController.getAllRegistrations);
router.route("/registrations/delete/:id").delete(authMiddleware, adminMiddleware, eventController.deleteRegistration);

// 🟢 Naya route: Registration Approve karne ke liye
router.route("/registrations/approve/:id").patch(authMiddleware, adminMiddleware, eventController.approveRegistration);

module.exports = router;