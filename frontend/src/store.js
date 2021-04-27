import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { galleryCreateReducer, galleryDeleteReducer, galleryListReducer } from './reducers/galleryReducers'
import { userLoginReducer, userDetailsReducer, userRegisterReducer, allUsersReducer, deleteUserReducer, updateUserReducer, updatePasswordReducer } from './reducers/userReducers'
import { createDailyMessageReducer, dailyMessagesReducer, deleteDailyMessageReducer } from './reducers/dailyMessageReducers'
import { createServiceReducer, serviceFindReducer, serviceListReducer } from './reducers/serviceReducers'
import { createReviewReducer, reviewListReducer } from './reducers/reviewReducers'
import { appointmentByDayReducer, appointmentListReducer, appointmentUpdateReducer, createAppointmentReducer, myAppointmentReducer } from './reducers/appointmentReducers'

//USE REDUCERS
const reducer = combineReducers({
    
    //GENERAL REDUCERS
    //Users
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    updateUser:updateUserReducer,
    updatePassword:updatePasswordReducer,
    
    //List Retrieval
    dailyMessages:dailyMessagesReducer,
    serviceList:serviceListReducer,  
    reviewList:reviewListReducer,
    galleryList:galleryListReducer,

    //Appointments
    appointmentList:appointmentListReducer,
    myAppointment:myAppointmentReducer,
    createAppointment:createAppointmentReducer,


    //ADMIN-ONLY REDUCERS
    //Appointments
    appointmentByDay:appointmentByDayReducer,
    appointmentUpdate:appointmentUpdateReducer,

    //Reviews
    createReview:createReviewReducer,

    //Services
    serviceFind:serviceFindReducer,
    createService:createServiceReducer,

    //Daily Messages
    createDailyMessage:createDailyMessageReducer,
    deleteDailyMessage:deleteDailyMessageReducer,

    //Users
    allUsers:allUsersReducer,
    deleteAUser:deleteUserReducer,

    //Gallery
    galleryCreate:galleryCreateReducer,
    galleryDelete:galleryDeleteReducer,

})

//Initial state = empty
const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):[]

    const initialState = {
        userLogin: {
            userInfo: userInfoFromStorage
        }
    }

//handles middleware
const middleware = [thunk]

//STORE CREATION
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store