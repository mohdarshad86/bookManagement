const jwt = require('jsonwebtoken')

const authentication = async function (req, res, next) {
    try{
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
    catch{
        return res.status(500).send({
            status: false,
            message: "Server Side Error"
        })
    }
}

const authorisation = async function (req, res, next) {
    try{
        
        let userId = req.params.userID
        if (userId != dataOfToken['userId'])
            return res.status(403).send({
                status: false,
                message: "You are not Authorized"
            })
        next()
    }
    catch{
        return res.status(500).send({
            status: false,
            message: "Server Side Error"
        })
    }

}

module.exports = { authentication, authorisation }