const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
    {
        bookId: {
            type:ObjectId, 
            ref:book,
            required:true 
        },

        reviewedBy: {
            type:string, 
            required:true, 
            default :'Guest'
        },
        reviewedAt: {
            type:Date, 
            required:true
        },
        rating: {
            type:number, 
            min :1, max:5,
            required:true},
        review: {
            type:string },

        isDeleted: {
            type:boolean,
             default: false}
    },{ timestamps: true })

    module.exports = mongoose.model("review", reviewSchema);