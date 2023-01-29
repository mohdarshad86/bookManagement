const userModel = require('../models/userModel.js');
const validation = require("../validation/validation")
const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {
    try {
        const userData = req.body

        if (!userData.title || userData.title.trim() == "") return res.status(400).send({ status: false, message: "tittle is mandatory" })
        if (typeof (userData.title) !== 'string') return res.status(400).send({ status: false, message: "wrong format of title" })
        if (!(["Mr", "Mrs", "Miss"].includes(userData.title.trim()))) return res.status(400).send({ status: false, message: "title can only contain Mr,Mrs, Miss" })
        userData.title=userData.title.trim()

        if (!userData.name || userData.name.trim() == "") return res.status(400).send({ status: false, message: "name is mandatory" })
        if (typeof (userData.name) !== 'string') return res.status(400).send({ status: false, message: "wrong format of name" })
        if (!validation.validate(userData.name.trim())) return res.status(400).send({ status: false, message: "invalid name" })

        userData.phone.trim()
        if (!userData.phone) return res.status(400).send({ status: false, message: "phone is mandatory" })
        if (typeof (userData.phone) !== "string") return res.status(400).send({ status: false, message: "wrong format of phone" })
        if (!validation.validatePhone(userData.phone)) return res.status(400).send({ status: false, message: "invalid phone number" })

        userData.email.trim()
        if (!userData.email) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (typeof (userData.email) !== "string") return res.status(400).send({ status: false, message: "wrong format of email" })
        if (!validation.validateEmail(userData.email)) return res.status(400).send({ status: false, message: "invalid email address" })

        if (!userData.password) return res.status(400).send({ status: false, message: "password is mandatory" })
        if (typeof (userData.password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
        if (!validation.validatePassword(userData.password)) return res.status(400).send({ status: false, message: "length of password should be 8 to 15 characters" })

        if (userData.address) {
            if (typeof (userData.address) !== 'object') return res.status(400).send({ status: false, message: "wrong address format" })
            if (userData.address.street) {

                if (typeof (userData.address.street) !== "string") return res.status(400).send({ status: false, message: "wrong street format" })
            }
            if (userData.address.city) {
                if (typeof (userData.address.city) !== "string") return res.status(400).send({ status: false, message: "wrong city format" })
            }
            if (userData.address.pincode) {
                if (typeof (userData.address.pincode) !== "string") return res.status(400).send({ status: false, message: "wrong pincode format" })
            }
        }

        const unique = await userModel.findOne({ $or: [{ email: userData.email }, { phone: userData.phone }] })
        if (unique) {
            if (unique.email == userData.email) return res.status(400).send({ status: false, message: "email already in use" })
            if (unique.phone == userData.phone) return res.status(400).send({ status: false, message: "phone already in use" })
        }
        const createdUser = await userModel.create(userData);
        res.status(201).send({ status: true, message: "success", data: createdUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const login = async function (req, res) {
    // for(x in req.body){
    //     req.body[x]=req.body[x].trim()
    //  }
    let { email, password } = req.body
    //validation of email
    if (!email || email.trim()=="") return res.status(400).send({ status: false, message: "email is mandatory" })
    if (typeof (email) !== "string") return res.status(400).send({ status: false, message: "wrong format of email" })
    if (!validation.validateEmail(email)) return res.status(400).send({ status: false, message: "invalid email address" })
    //validation of password
    if (!password || password.trim()=="") return res.status(400).send({ status: false, message: "password is mandatory" })
    if (typeof (password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
    if (!validation.validatePassword(password)) return res.status(400).send({ status: false, message: "length of password should be 8 to 15 characters" })

    let isUserExist = await userModel.findOne({ email: email, password: password })
    if (!isUserExist)
        return res.status(401).send({status:false, message:"Email Id and password are incorrect"})
    const userToken = jwt.sign({ userId: isUserExist._id }, 'secretKey', { expiresIn: 1800 })

    const userTokenData = jwt.decode(userToken)
    userTokenData.iat = new Date(userTokenData.iat*1000).toGMTString()
    userTokenData.exp = new Date(userTokenData.exp*1000).toGMTString()

    return res.status(200).send({
        status: true,
        message: 'Success',
        data: {
            userToken: userToken,
            ...userTokenData

        }
    })

};


module.exports.createUser = createUser
module.exports.login = login