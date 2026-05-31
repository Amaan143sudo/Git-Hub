const express = require("express");
const router = express.Router();
const { getAllExpos, bookBooth } = require("../controllers/expo-controller");

router.route("/all").get(getAllExpos);
router.route("/book").post(bookBooth);

module.exports = router;
