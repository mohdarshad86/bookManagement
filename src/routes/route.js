const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController=require("../controllers/userController")
const { authentication, authorisation } = require("../middlewares/middleware")


router.post("/register", userController.createUser)
router.post("/login", userController.login)

router.post("/books", bookController.createBooks)

router.get("/books", authentication, bookController.getBooks)






module.exports = router;
