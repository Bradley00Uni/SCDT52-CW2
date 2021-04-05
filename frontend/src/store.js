import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {imageListReducer} from './reducers/galleryReducers'

//use reducers
const reducer = combineReducers({
    imageList:imageListReducer
})

//set initial state to empty
const initialState = {}

//handles middleware use
const middleware = [thunk]

//creates the store to keep as a central point for all data
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store