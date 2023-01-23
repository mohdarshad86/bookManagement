
const bookModel=require("../models/bookModel")
const userModel=require("../models/userModel")

createBooks= async (req,res)=>{
    let data=req.body;
    let userId=req.body.userId;
    const checkUserId= await userModel.findOne({userId:userId})
    if(!checkUserId) return res.status(400).send("User does not exist")
    let createBook= await bookModel.create(data)
    res.status(201).send({status:true, message:"Success", data:createBook})

}
