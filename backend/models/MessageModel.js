const mongoose = require('mongoose') 

const messageSchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Message = mongoose.model('Dailymessage', messageSchema)
module.exports = Message