const express = require("express");
const router = express.Router();
const isAuthenticatedUser = require("../middleware/auth.middleware");
const { addResume, getResumes, deleteResume, updateResume } = require("../controllers/resume.controller");

router.route("/").post(isAuthenticatedUser, addResume);
router.route("/").get(isAuthenticatedUser, getResumes);
router.route("/:id")
    .delete(isAuthenticatedUser, deleteResume)
    .put(isAuthenticatedUser, updateResume);
router.route("/").get(isAuthenticatedUser, getResumes);


module.exports = router;
