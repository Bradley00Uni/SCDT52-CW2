//AUTHORISDE/VALIDATE PROTECTED PAGES

//VALIDATE CURRENT SESSION AND USER
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const protect = async(req, res, next)=>{
    let token = req.headers.authorization

    try{
        if (token){
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       req.user = await User.findById(decoded.id).select('-password')
       }
        if (!token){
       res.status(401)
       throw new Error('Not Authorised - No Token Found')
       }
       console.log(req.user)
       next()
   }
   catch(error){
       console.error(error)
       res.status(401)
       throw new Error("Authorisation Failed - Token Expired")
   }
}


const adminCheck = (req, res, next)=>{

    if (req.user && req.user.isAdmin){
        console.log('is an Admin')
        next()
    }
    else{
        res.status(401).json({message: "Not an Admin"})
    }

}

module.exports = {protect, adminCheck}