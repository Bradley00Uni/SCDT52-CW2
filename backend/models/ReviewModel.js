const mongoose = require('mongoose') 

const reviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
        
    },
     review:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review