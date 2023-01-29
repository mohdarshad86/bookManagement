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

        if (!userData.phone) return res.status(400).send({ status: false, message: "phone is mandatory" })
        if (typeof (userData.phone) !== "string") return res.status(400).send({ status: false, message: "wrong format of phone" })
        if (!validation.validatePhone(userData.phone.trim())) return res.status(400).send({ status: false, message: "invalid phone number" })

        
        if (!userData.email) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (typeof (userData.email) !== "string") return res.status(400).send({ status: false, message: "wrong format of email" })
        if (!validation.validateEmail(userData.email.trim())) return res.status(400).send({ status: false, message: "invalid email address" })

        if (!userData.password) return res.status(400).send({ status: false, message: "password is mandatory" })
        if (typeof (userData.password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
        if (!validation.validatePassword(userData.password)) return res.status(400).send({ status: false, message: "length of password should be 8 to 15 characters" })

        if (userData.address) {
            if (typeof (userData.address) !== 'object') return res.status(400).send({ status: false, message: "wrong address format" })
            if(Object.keys(userData.address).length==0) return res.status(400).send({status:false, message:"empty address"})

            if (Object.keys(userData.address).includes("street")) {
                if (typeof (userData.address.street) !== "string") return res.status(400).send({ status: false, message: "wrong street format" })
                if(userData.address.street.trim()=="") return res.status(400).send({ status: false, message: "empty street" })
                userData.address.street.trim()
            }

            if (Object.keys(userData.address).includes("city")) {
                if (typeof (userData.address.city) !== "string") return res.status(400).send({ status: false, message: "wrong city format" })
                if(userData.address.city.trim()=="") return res.status(400).send({ status: false, message: "empty city" })
                userData.address.city.trim()
            }
            if (Object.keys(userData.address).includes("pincode")) {
                if (typeof (userData.address.pincode) !== "string") return res.status(400).send({ status: false, message: "wrong pincode format" })
                if(userData.address.pincode.trim()=="") return res.status(400).send({ status: false, message: "empty city" })
                userData.address.pincode.trim()
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
        res.status(500).send({ status: false, message: error.message })
    }
}