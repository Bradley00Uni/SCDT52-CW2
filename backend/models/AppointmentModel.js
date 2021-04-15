const mongoose = require('mongoose') 

const appointmentSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type: String,
        required:true,
    },
     service:{
        type: String,
        required:true,
    },
    price:{
        type: String,
        required:true,
    },
    duration:{
        type: String,
        required:true,
    },
    appointmentDate:{
        type: String,
        required: true
    },
    appointmentTime:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: false
    },
    isConfirmed:{
        type: Boolean,
        required: true,
        default: false
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    isComplete:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date,
    }

},{
    timestamps:true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment