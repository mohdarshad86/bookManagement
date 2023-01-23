const express = require("express");

const router = express.Router();

router.post("/createUser", userController.createUser);

module.exports = router;
