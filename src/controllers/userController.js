const userModel = require('../models/userModel.js');
const validation=require("../validations/validation")

const createUser = async function(req,res){
try{
const userData = req.body

if(!userData.title) return res.status(400).send({status:false,message:"tittle is mandetory"})
if(typeof(userData.title!=="string")) return res.status(400).send({status:false,message:"wrong format of title"})
if(!(["Mr", "Mrs", "Miss"].includes(userData.title))) return res.status(400).send({status:false,message:"title can only contain Mr,Mrs, Miss"})

if(!userData.name) return res.status(400).send({status:false,message:"name is mandetory"})
//if(typeof(userData.name!=="string")) return res.status(400).send({status:false,message:"wrong format of name"})
if(!validation.validate(userData.name)) return res.status(400).send({})

if(!userData.phone) return res.status(400).send({status:false,message:"phone is mandetory"})
if(typeof(userData.phone!=="string")) return res.status(400).send({status:false,message:"wrong format of phone"})
if(!(userData.phone).match(/((\+)((0[ -]+)|(91 ))(\d{12}+|\d{10}+))|\d{5}([- ])\d{6}/)) return res.status(400).send({status:false,message:"invalid phone number"})

if(!userData.email) return res.status(400).send({status:false,message:"email is mandetory"})
if(typeof(userData.email!=="string")) return res.status(400).send({status:false,message:"wrong format of email"})
if(!((userData.email).match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))) return res.status(400).send({status:false,message:"invalid email address"})

if(!userData.password) return res.status(400).send({status:false,message:"password is mandetory"})
if(typeof(userData.password!=="string")) return res.status(400).send({status:false,message:"wrong format of password"})
if(!((userData.password).match(/^.(?=.{8,})(?=.[a-zA-Z])(?=.\d)./))) return res.status(400).send({status:false,message:"length of password should be 8 to 15 characters"})

if(userData.address){
    if(typeof(userData.address)!==Object) return res.status(400).send({status:false,message:"wrong address format"})
    if(userData.address.street){

        if(typeof(userData.address.street)!="string") return res.status(400).send({status:false,message:"wrong street format"})
    }
    if(userData.address.city){
        if(typeof(userData.address.city)!="string") return res.status(400).send({status:false,message:"wrong city format"})
    }
    if(userData.address.pincode){
        if(typeof(userData.address.pincode)!="string") return res.status(400).send({status:false,message:"wrong pincode format"})
    }
}

const unique = await userModel.findOne({$or:[{email:userData.email},{phone:userData.phone}]})
if(unique.email===userData.email) return res.status(400).send({status:false,message:"email already in use"})
if(unique.phone===userData.phone) return res.status(400).send({status:false,message:"phone already in use"})

const createdUser = await userModel.create(userData);
res.status(201).send({status:true,message:success, data:createdUser})

 }catch(error){
    res.status(500).send({status:false,message:error.message})
 }
}

module.exports.createUser = createUser