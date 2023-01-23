const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")

// router.post("/createUser", userController.createUser);


router.post("/books", bookController.createBooks)

module.exports = router;
