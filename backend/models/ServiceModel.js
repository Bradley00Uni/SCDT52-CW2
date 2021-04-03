const mongoose = require('mongoose') 

const serviceSchema = mongoose.Schema({
    service:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    duration:{
        type:Number,
        required:true,
        default:0
    },

},{
    timestamps:true
})

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service