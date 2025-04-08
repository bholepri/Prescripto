import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userData:{
        type:String,
        required:true
    },
    docData:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    } ,
    date:{
        type:Date,
        default:Date.now()
    }
})

const reviewModel=mongoose.models.review || mongoose.model('review',reviewSchema)
export default reviewModel