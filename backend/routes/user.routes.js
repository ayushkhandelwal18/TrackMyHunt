const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const protect = require("../middleware/auth.middleware");

router.put("/profile", protect, userController.updateProfile);
router.put("/password", protect, userController.changePassword);
router.delete("/account", protect, userController.deleteAccount);

module.exports = router;
