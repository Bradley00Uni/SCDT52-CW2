const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')

dotenv.config()
connectDB()


//ENSTANTIATE OBJECTS
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