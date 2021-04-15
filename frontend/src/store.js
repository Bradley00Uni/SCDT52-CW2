import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { galleryListReducer } from './reducers/galleryReducers'
import { userLoginReducer, userDetailsReducer, userRegisterReducer } from './reducers/userReducers'
import { dailyMessagesReducer } from './reducers/dailyMessageReducers'
import { serviceListReducer } from './reducers/serviceReducers'
import { reviewListReducer } from './reducers/reviewReducers'
import { appointmentByDayReducer, appointmentConfirmReducer, appointmentListReducer, createAppointmentReducer, myAppointmentReducer } from './reducers/appointmentReducers'

//USE REDUCERS
const reducer = combineReducers({
    galleryList:galleryListReducer,

    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    
    dailyMessages:dailyMessagesReducer,
    serviceList:serviceListReducer,
    
    reviewList:reviewListReducer,

    appointmentList:appointmentListReducer,
    myAppointment:myAppointmentReducer,
    createAppointment:createAppointmentReducer,
    appointmentByDay:appointmentByDayReducer,
    appointmentConfirm:appointmentConfirmReducer
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