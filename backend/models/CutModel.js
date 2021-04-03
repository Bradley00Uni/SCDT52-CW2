const mongoose = require('mongoose') 

const exampleCutSchema = mongoose.Schema({
    imageURL:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const ExampleCut = mongoose.model('Examplecut', exampleCutSchema)
module.exports = ExampleCut