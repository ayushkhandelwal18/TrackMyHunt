const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/application.contoller");
const protect = require("../middleware/auth.middleware");

router.post("/create", protect, ctrl.createApplication);
router.get("/get", protect, ctrl.getApplications);

module.exports = router;
