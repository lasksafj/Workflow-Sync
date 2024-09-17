const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
    "/profile-getRole",
    authMiddleware,
    profileController.profileGetRole
);
router.get("/profile-getOrg", authMiddleware, profileController.profileGetOrg);

module.exports = router;