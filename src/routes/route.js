const express = require("express");
const router = express.Router();
const bookController=require("../controllers/bookController")
const userController=require("../controllers/userController")
const { authentication, authorisation } = require("../middlewares/middleware")

//user
router.post("/register", userController.createUser)
router.post("/login", userController.login)
//books
router.post("/books", bookController.createBooks)

router.get("/books", bookController.getBooks)

//update
router.put("/books/:bookId", bookController.updateBooks)

router.delete("/books/:bookId", authentication,authorisation,bookController.deleteBooks)




module.exports = router;
