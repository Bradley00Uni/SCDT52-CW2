const mongoose = require('mongoose') 

const appointmentSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
     serviceId:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment