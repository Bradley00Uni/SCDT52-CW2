const express = require('express')
const dotenv = require('dotenv')
const app = express()
const connectDB = require('./config/db')

//ERROR HANDLER MIDDLEWARE
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

//AUTHORISE MIDDLEWARE
const {protect, adminCheck} = require('./middleware/authMiddleware')

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
//Return all Gallery Entries
app.get('/api/cuts', async (req, res)=>{
    const cuts = await ExampleCut.find({})
    res.json(cuts)
})

//Admin Only - Add new Entry
app.post('/api/cuts', protect, adminCheck, async(req,res)=>{
    const {caption, imageURL} = req.body

    const image = await ExampleCut.create({
        imageURL: imageURL,
        description: caption
    })

    if(!image){
        res.status(400)
        throw new Error("Invalid Details Provided")
    }
})

//Admin Only - Delete an Entry
app.post('/api/cuts/:id', protect, adminCheck, async(req,res)=>{
    const {image} = req.body

    const deleteImage = await ExampleCut.deleteOne(image)

    res.json('Gallery Entry Deleted')
})


//APPOINTMENT ROUTES
// Admin-only retrieval of all bookings 
app.get('/api/appointments', protect, adminCheck, async (req, res)=>{
    const appointments = await Appointment.find({})
    res.json(appointments)
})

//get specific availablity for a day
app.get('/api/appointments/day/:id', async(req, res)=>{
    const day = req.params.id
    const bookings = await Appointment.find({appointmentDate: day})

    const slotTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    const bookedSlots = []

    for(var i=0; i<bookings.length; i++){
        bookedSlots.push(bookings[i].appointmentTime)
    }

    var available = slotTimes.filter((items) => !bookedSlots.includes(items))

    res.json(available)
})

//Create new Booking
app.post('/api/appointments', protect, async(req, res)=>{
    console.log('booking request')

    const {serviceId, appointmentDate, appointmentTime, note} = req.body
    const loggedInUser = await User.findOne({_id:req.user._id})
    const chosenService = await Service.findOne({_id: serviceId})

    if(!loggedInUser){
        res.status(401).json({message: 'User Not Found'})
    }

    if(!chosenService){
        res.status(401).json({message: 'No Chosen Service'})
    }

    const appointment = await Appointment.create({
        user: loggedInUser,
        name: loggedInUser.name,
        service: chosenService.service,
        price: chosenService.price,
        duration: chosenService.duration,
        appointmentDate,
        appointmentTime,
        note
    })

    if(appointment){
        res.status(201).json({
            _id: appointment._id,
            user: appointment.user.name,
            service: appointment.service,
            price: appointment.price,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime, 
            note: appointment.note
        })
    }
    else{
        res.status(400).json({message: 'Booking error - Incorrect Data'})
        throw new Error('Invalid Data')
    }
})


//User-specific bookings
app.get('/api/appointments/myappointments', protect, async(req, res)=>{
    console.log(req.user)

    const myAppointments = await Appointment.find({user: req.user._id})

    if(myAppointments){

        if(myAppointments.length === 0){
            res.json([])
        }
        else{
            res.json(myAppointments)
        }

    }
})

//Update Booking (Admin-only)
//'Confirm' Status
app.put('/api/appointments/:id/confirm', protect, adminCheck, async(req, res)=>{
    const {passed} = req.body

    const appointment = await Appointment.findOne({_id: passed}) 
    appointment.isConfirmed = true
    const updated = await appointment.save()

    if(updated){
        res.json('Appointment Updated')
    }
    else{
        throw new Error('Update Failed')
    }
})

//'Complete' Status
app.put('/api/appointments/:id/complete', protect, adminCheck, async(req, res)=>{
    const {passed} = req.body

    const appointment = await Appointment.findOne({_id: passed}) 
    appointment.isComplete = true
    const updated = await appointment.save()

    if(updated){
        res.json('Appointment Updated')
    }
    else{
        throw new Error('Update Failed')
    }
})

//Delete Appointment
app.put('/api/appointments/:id/delete', protect, adminCheck, async(req, res)=>{
    const {passed} = req.body

    const appointment = await Appointment.findOne({_id: passed}) 
    const updated = await Appointment.deleteOne(appointment)

    if(updated){
        res.json('Appointment Deleted')
    }
    else{
        throw new Error('Update Failed')
    }
})


//DAILY MESSAGE ROUTES
//Return all Messages
app.get('/api/messages', async (req, res)=>{
    const dailyMessages = await DailyMessage.find({})
    res.json(dailyMessages)
})

//Add new Message
app.post('/api/messages', protect, adminCheck, async(req,res)=>{
    const {messageText} = req.body

    const dailyMessage = await DailyMessage.create({
        message: messageText
    })

    if(!dailyMessage){
        res.status(400).json({message: 'Error - Incorrect Data Provided'})
        throw new Error('Invalid Data')
    }
})

//Delete Message
app.post('/api/messages/:id', protect, adminCheck, async(req,res)=>{
    const dailyMessage = req.body
    await DailyMessage.deleteOne(dailyMessage)
    res.json('Daily Message Deleted')
})




//REVIEW ROUTES
//Retrieval of all reviews for display
app.get('/api/reviews', async (req, res)=>{
    const reviews = await Review.find({})
    res.json(reviews)
})


//Leave Review
app.post('/api/reviews', protect, async(req, res)=>{
    console.log('review request')

    const {title, body, rating, anon} = req.body
    const currentUser = await User.findOne({_id:req.user._id})
    const anonymousUser = await User.findOne({_id:'607edbf604d35c0db8d5fc8b'})

    if(!currentUser){
        res.status(401).json({message: 'User Not Found'})
    }
    
    if(anon){

        if(rating > 5){
            //Do Nothing
        }
        else{
            const review = await Review.create({
                user: anonymousUser,
                client: anonymousUser.name,
                title,
                body,
                rating
            })
        }

        if(review){
            res.status(201).json({
                _id: review.id,
                user: review.client,
                title: review.title,
                review: review.body,
                rating: review.rating
            })
        }
        else{
            res.status(400).json({message: 'Error - Incorrect Data Provided'})
            throw new Error('Invalid Data')
        }
    }
    else{
        const review = await Review.create({
            user: currentUser,
            client: currentUser.name,
            title,
            body,
            rating
        })

        if(review){
            res.status(201).json({
                _id: review.id,
                user: review.client,
                title: review.title,
                review: review.body,
                rating: review.rating
            })
        }
        else{
            res.status(400).json({message: 'Error - Incorrect Data Provided'})
            throw new Error('Invalid Data')
        }
    }
})


//SERVICE ROUTES
app.get('/api/services', async (req, res)=>{
    const services = await Service.find({})
    res.json(services)
})

//Create a Service
app.post('/api/services', protect, adminCheck, async(req, res)=>{

    const {haircut, price, duration, image} = req.body

    const service = await Service.create({
        service: haircut,
        price: price,
        duration: duration,
        imageURL: image
    })

    if(service){
        res.json('Create Success')
    }
    else{
        res.status(400).json({message: 'Service error - Incorrect Data'})
        throw new Error('Invalid Data')
    }

})

//Delete a Service
app.post('/api/services/:id', protect, adminCheck, async (req, res)=>{

    const {service} = req.body
   await Service.deleteOne(service)
   res.json('Service Deleted')
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
        res.status(401).json({message: 'Invalid Credentials'})
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

//Return user Profile
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

//Update Contact Details
app.put('/api/users/:profile/contact', protect, async(req, res)=>{
    const {currentUser, email, phone} = req.body

    const userFind = await User.findOne({_id: currentUser})

    if(userFind){
        userFind.email = email
        userFind.phone = phone

        const update = await userFind.save()
        res.json('Contact Details Updated')
    }
    else{
        res.status(404).json({message: 'Details could not be updated'})
        throw new Error('Details could not be updated')
    }
})

//Update Password
app.put('/api/users/:profile/password', protect, async(req, res)=>{
    const {currentUser, currentPassword, newPassword} = req.body

    const userFind = await User.findOne({_id: currentUser})

    if(userFind && (await userFind.matchPassword(currentPassword))){
        userFind.password = newPassword
       
        const update = await userFind.save()
        res.json('Contact Details Updated')
    }
    else{
        res.status(404).json({message: 'Details could not be updated'})
        throw new Error('Details could not be updated')
    }
})


//ADMIN ONLY - RETURN ALL USERS
app.get('/api/users', protect, adminCheck, async(req, res) =>{
    const users = await User.find({})
    res.json(users)
})

//ADMIN ONLY - DELETE A USER
app.post('/api/users/:id', protect, adminCheck, async(req, res) => {
    const {account} = req.body
    await User.deleteOne(account)
    res.json('Deleted User')
})




//ERROR HANDLING
app.use(notFound);
app.use(errorHandler)