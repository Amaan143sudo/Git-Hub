const adminMiddleware = async (req, res, next) => {
  try {
    // req.user humein auth-middleware se milta hai
    const userRole = req.user.isAdmin;

    if (!userRole) {
      return res.status(403).json({
        message: "Access denied. User is not an admin.",
      });
    }

    // Agar admin hai, toh agle step (controller) par bhejo
    next();
  } catch (error) {
    console.log("Admin Middleware Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Admin Middleware" });
  }
};

module.exports = adminMiddleware;
