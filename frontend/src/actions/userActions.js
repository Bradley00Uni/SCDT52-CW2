import axios from 'axios'

//LOG IN USER
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login', {email, password}, config)
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
         dispatch({
            type: 'USER_LOGIN_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


//GET USER DETAILS FROM STATE
export const getUserDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: 'USER_DETAILS_REQUEST'
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: userInfo.token
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        })
    }
    catch(error){
         dispatch({
            type: 'USER_DETAILS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


//REGISTER USER
export const register = (name, email, phone, password) => async(dispatch) => {
    try{
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {name, email, phone, password}, config)
        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
         dispatch({
            type: 'USER_REGISTER_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


//LOGOUT USER
export const logout = () =>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type: 'USER_DETAILS_RESET'})
    dispatch({type: 'USER_LOGOUT'})
}