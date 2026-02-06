const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/dashboard.controller");

router.get("/", auth, controller.getDashboardStats);

module.exports = router;
