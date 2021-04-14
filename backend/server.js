const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')

//ERROR HANDLER MIDDLEWARE
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

//AUTHORISE MIDDLEWARE
const protect = require('./middleware/authMiddleware')

//LOGIN/REGISTER TOKEN GENERATION
const generateToken = require('./utils/generateToken')

dotenv.config()
connectDB()

//ALLOW JSON INCOMING
app.use(express.json())

//INSTANTIATE OBJECTS
const ExampleCut = require('./models/CutModel')
const Appointment = require('./models/AppointmentModel')
const DailyMessage = require('./models/MessageModel')
const Review = require('./models/ReviewModel')
const Service = require('./models/ServiceModel')
const User = require('./models/UserModel')


//GENERAL ROUTES
const PORT = process.env.PORT || 5006

app.listen(PORT, (req, res)=>{
    console.log('>Sever Active on Port 5006')
})

app.get('/', (req, res)=>{
    res.send('>Api is Online')
})


//GALLERY ROUTES
app.get('/api/cuts', async (req, res)=>{
    const cuts = await ExampleCut.find({})
    res.json(cuts)
})


//APPOINTMENT ROUTES
app.get('/api/appointments', async (req, res)=>{
    const appointments = await Appointment.find({})
    res.json(appointments)
})


//DAILY MESSAGE ROUTES
app.get('/api/messages', async (req, res)=>{
    const dailyMessages = await DailyMessage.find({})
    res.json(dailyMessages)
})


//REVIEW ROUTES
app.get('/api/reviews', async (req, res)=>{
    const reviews = await Review.find({})
    res.json(reviews)
})


//SERVICE ROUTES
app.get('/api/services', async (req, res)=>{
    const services = await Service.find({})
    res.json(services)
})

//USER AUTHENTICATION AND LOGIN/REGISTRATION
//Login
app.post('/api/users/login', async(req, res)=>{
    
    const{email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }
    else{
        res.json({message: "Invalid Login"})
        throw new Error('Invalid Credentials')
    }
})

//Register
app.post('/api/users', async(req, res) =>{

    const {name, email, phone, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(401).json({message: "Email Already Registered"})
        throw new Error('Email Already Registered')
    }
    
    const user = await User.create({
        name,
        email,
        phone,
        password
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid Credentials Provided")
    }

})

app.get('/api/users/profile', protect, async(req, res) =>{

    const user = await User.findById(req.user.id)

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid Credentials Provided")
    }

})


//ERROR HANDLING
app.use(notFound);
app.use(errorHandler)