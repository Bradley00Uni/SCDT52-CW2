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


//ADMIN ONLY - ALL USERS
export const allUsers = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: 'ALL_USERS_REQUEST'
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: userInfo.token
            }
        }
        const {data} = await axios.get('/api/users', config)
        dispatch({
            type: 'ALL_USERS_SUCCESS',
            payload: data
        })
    }
    catch(error){
         dispatch({
            type: 'ALL_USERS_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


//ADMIN ONLY - DELETE A USER
export const deleteUser = (account) => async(dispatch, getState) => {
    try{
        dispatch({
            type: 'DELETED_USER_REQUEST'
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: userInfo.token
            }
        }
        const {data} = await axios.post(`/api/users/${account.id}`, {account}, config)
        dispatch({
            type: 'DELETED_USER_SUCCESS',
            payload: data
        })
    }
    catch(error){
         dispatch({
            type: 'DELETED_USER_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


//USER-UPDATED DETAILS
export const updateUser = (currentUser, email, phone) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'UPDATE_USER_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //PUT API DATA
        const {data} = await axios.put(`/api/users/${currentUser}/contact`,{currentUser, email, phone} ,config)

        dispatch({type: 'UPDATE_USER_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'UPDATE_USER_FAIL', payload: error.message})
    }
}

//UPDATE USER'S PASSWORD
export const updatePassword = (currentUser, currentPassword, newPassword) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'UPDATE_PASSWORD_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //PUT API DATA
        const {data} = await axios.put(`/api/users/${currentUser}/password`,{currentUser, currentPassword, newPassword} ,config)

        dispatch({type: 'UPDATE_PASSWORD_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'UPDATE_PASSWORD_FAIL', payload: error.message})
    }
}

//LOGOUT USER
export const logout = () =>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type: 'USER_DETAILS_RESET'})
    dispatch({type: 'USER_LOGOUT'})
}