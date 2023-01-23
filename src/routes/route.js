const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController=require("../controllers/userController")

// router.post("/createUser", userController.createUser);


router.post("/books", bookController.createBooks)
router.post("/register", userController.createUser)


module.exports = router;
