const jwt = require('jsonwebtoken')

//Function used to generate unique JWT web token for validating login

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,
        {
            expiresIn: '10d'
        })
}

module.exports = generateToken