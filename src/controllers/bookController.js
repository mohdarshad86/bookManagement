
const bookModel=require("../models/bookModel")
const userModel=require("../models/userModel")
 const validation=require("../validations/validation")


const createBooks= async (req,res)=>{
    try{
    let data=req.body;
    let {title,excerpt,userId,ISBN,category,subcategory}=data
    
    if(!title) return res.status(400).send({status:false,message:"title is mandatory"})
    if(!validation.validate(title)) return res.status(400).send({status:false, message:"Please enter valid title"})

    if(!excerpt) return res.status(400).send({status:false, message:"excerpt is mandatory"})
    if(!validation.validate(excerpt)) return res.status(400).send({status:false, message:"Please enter valid excerpt"})

    if(!userId) return res.status(400).send({status:false, message:"user Id is mandatory"})
    if(!validation.validateObjectId.test(userId)) return res.status(400).send({status:false, message:"Please enter valid userId"})


    if(!ISBN) return res.status(400).send({status:false, message:"ISBN is mandatory"})
    if(!validation.validateISBN(ISBN)) return res.status(400).send({status:false, message:"Please enter valid ISBN"})


    if(!category) return res.status(400).send({status:false, message:"category is mandatory"})
    if(!validation.validate(category)) return res.status(400).send({status:false, message:"Please enter valid category"})


    if(!subcategory) return res.status(400).send({status:false, message:"subcategory is mandatory"})
    if(!validation.validate(subcategory)) return res.status(400).send({status:false, message:"Please enter valid subcategory"})

    const checkUserId= await userModel.findById(userId)

    if(!checkUserId) return res.status(404).send({status:false, message:"User does not exist"})

    const checkUniqueness= await bookModel.findOne({$or:[{title:title},{ISBN:ISBN}]})

    if(checkUniqueness.title==title) return res.status(400).send({status:false, message:"title already exist"})

    if(checkUniqueness.ISBN==ISBN) return res.status(400).send({status:false,message:"ISBN already exist"})

    let createBook= await bookModel.create(data)
    res.status(201).send({status:true, message:"Success", data:createBook})
    
    } catch(err){
        res.status(500).send({status:false,message:err.message})
    }

}

module.exports={createBooks}