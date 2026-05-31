const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// 🟢 1. Saare Users Fetch Karna
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) return res.status(404).json({ message: "No Users Found" });
    return res.status(200).json(users);
  } catch (error) { next(error); }
};

// 🟢 2. Single User Details (For Edit Page)
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    if (!data) return res.status(404).json({ message: "User Not Found" });
    return res.status(200).json(data);
  } catch (error) { next(error); }
};

// 🟢 3. Update User Data
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    await User.updateOne({ _id: id }, { $set: updatedUserData });
    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) { next(error); }
};

// 🟢 4. Delete User
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) { next(error); }
};

// 🟢 5. Get All Contacts/Messages
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) { next(error); }
};

// 🟢 6. Delete Contact
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) { next(error); }
};

// 🟢 7. Update/Reply Contact (Admin Reply Logic)
const updateContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    // status ko 'Replied' set karein aur admin ka reply message save karein
    const { replyText } = req.body;
    
    await Contact.updateOne(
      { _id: id }, 
      { 
        $set: { 
          status: "Replied", 
          adminReply: replyText 
        } 
      }
    );
    
    return res.status(200).json({ message: "Replied Successfully" });
  } catch (error) { next(error); }
};

// 🎯 SARE FUNCTIONS EXPORT KIYE
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllContacts,
  deleteContactById,
  updateContactById,
};