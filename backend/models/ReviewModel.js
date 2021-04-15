const mongoose = require('mongoose') 

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    client:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },

},{
    timestamps:true
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review