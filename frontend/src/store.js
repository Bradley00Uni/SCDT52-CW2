import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { galleryListReducer } from './reducers/galleryReducers'
import { userLoginReducer } from './reducers/userReducers'
import { dailyMessagesReducer } from './reducers/dailyMessageReducers'
import { serviceListReducer } from './reducers/serviceReducers'
import { reviewListReducer } from './reducers/reviewReducers'

//USE REDUCERS
const reducer = combineReducers({
    galleryList:galleryListReducer,
    userLogin:userLoginReducer,
    dailyMessages:dailyMessagesReducer,
    serviceList:serviceListReducer,
    reviewList:reviewListReducer,
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