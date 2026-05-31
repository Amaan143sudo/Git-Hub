const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Registration = require("../models/eventRegister-model");

const getDashboardStats = async (req, res) => {
  try {
    // MongoDB se data fetch karna
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalRegs = await Registration.countDocuments();

    // Stats Object
    const stats = {
      orders: totalRegs, 
      revenue: (totalRegs * 499 / 1000).toFixed(1), // Example revenue calc
      users: (totalUsers / 1).toFixed(0),
      regs: totalRegs
    };

    // Chart Data (Mockup - Aap ise DB aggregation se bhi kar sakte hain)
    const charts = {
      sales: [12, 19, 3, 5, 2],
      orders: [5, 10, 8, 12, 7]
    };

    res.status(200).json({ stats, charts });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { 
  getDashboardStats, 
  getAllUsers, 
  getUserById, 
  updateUserById, 
  deleteUserById, 
  getAllContacts, 
  deleteContactById 
};