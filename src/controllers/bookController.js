const bookModel=require("../models/bookModel")
const userModel=require("../models/userModel")
const validation=require("../validations/validation")


const createBooks= async (req,res)=>{
    try{
    let data=req.body;
    let {title,excerpt,userId,ISBN,category,subcategory}=data
    
    title = title.trim().toLowerCase();
    if(!title || title=="") return res.status(400).send({status:false,message:"title is mandatory"})
    if(!validation.validate(title)) return res.status(400).send({status:false, message:"Please enter valid title"})

    if(!excerpt) return res.status(400).send({status:false, message:"excerpt is mandatory"})
    if(!validation.validate(excerpt)) return res.status(400).send({status:false, message:"Please enter valid excerpt"})

    if(!userId) return res.status(400).send({status:false, message:"user Id is mandatory"})
    if(!validation.validateObjectId(userId)) return res.status(400).send({status:false, message:"Please enter valid userId"})


    if(!ISBN) return res.status(400).send({status:false, message:"ISBN is mandatory"})
    if(!validation.validateISBN(ISBN)) return res.status(400).send({status:false, message:"Please enter valid ISBN"})


    if(!category) return res.status(400).send({status:false, message:"category is mandatory"})
    if(!validation.validate(category)) return res.status(400).send({status:false, message:"Please enter valid category"})


    if(!subcategory) return res.status(400).send({status:false, message:"subcategory is mandatory"})
    if(!validation.validate(subcategory)) return res.status(400).send({status:false, message:"Please enter valid subcategory"})

    const checkUserId= await userModel.findById(userId)

    if(!checkUserId) return res.status(404).send({status:false, message:"User does not exist"})

    const checkUniqueness= await bookModel.findOne({$or:[{title:title}, {ISBN:ISBN}]})

    if (checkUniqueness) {
    if(checkUniqueness.title == title) return res.status(400).send({status:false, message:"title already exist"})
    if(checkUniqueness.ISBN == ISBN) return res.status(400).send({status:false, message:"ISBN already exist"})
    }

    let createBook= await bookModel.create(data)
    res.status(201).send({status:true, message:"Success", data:createBook})    
    } catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const getBooks=async(req, res)=>{

    let { userId, category, subcategory } = req.query

    let filter = {isDeleted:false}

    if (userId) filter.userId = userId
    
    if(category) filter.category = category

    if(subcategory) filter.subcategory = subcategory

    let allBooks = await bookModel.find(filter).select({ISBN:0, subcategory:0, __V:0, createdAt:0, updatedAt:0}).sort({title:1})

    if (allBooks.length == 0) {
        return res.status(404).send({status:false, message:"No book exist in the collection"})
    }

    return res.status(200).send({status:true, data:allBooks})
}

module.exports={createBooks, getBooks}