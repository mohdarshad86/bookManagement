const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const userModel = require('../models/userModel')
const bookModel = require("../models/bookModel");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers.token
        if (!token)
            return res.status(401).send({
                status: false,
                message: "Please login first"
            })
        let dataOfToken = jwt.verify(token, 'secretKey', (err, res) => {
            if (err)
                return "Token Expired"
            return res
        })
        if (dataOfToken == "Token Expired")
            return res.status(403).send({
                status: false,
                message: "Token Expired so please login again"
            })
        next()
    }
    catch {
        return res.status(500).send({
            status: false,
            message: "Server Side Error"
        })
    }
}

const authorisation = async function (req, res, next) {
    try {
        const token = req.headers.token
        const userIdInToken = jwt.decode(token).userId
        const booksId = req.params.bookId
        //console.log(booksId)
        if (!isValidObjectId(booksId)) {
            return res.status(400).send({
                status: false,
                message: "Please enter Valid Object Id"
            })
        }
        const userId = await bookModel.findById(booksId).select({ userId: 1,_id:0 })
        if (!userId) {
            return res.status(404).send({
                status: false,
                message: "Book Id Doesn't exist"
            })
        }
        if (userId.userId != userIdInToken)
            return res.status(403).send({
                status: false,
                message: "You are not Authorized"
            })
        next()
    }
    catch {
        return res.status(500).send({
            status: false,
            message: "<--Server Side Error"
        })
    }

}

module.exports = { authentication, authorisation }