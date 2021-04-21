import axios from 'axios'

//ADMIN LIST OF ALL APPOINTMENTS
export const listAppointments = () => async (dispatch, getState) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'APPOINTMENT_LIST_REQUEST'})

        //GET USER DATA
        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //GET API DATA
        const {data} = await axios.get('/api/appointments', config)

        dispatch({type: 'APPOINTMENT_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'APPOINTMENT_LIST_FAIL', payload: error.message})
    }
}


//USER LIST OF ALL THEIR APPOINTMENTS
export const myAppointments = () => async (dispatch, getState) =>{
    try{
        dispatch({type: 'MY_APPOINTMENTS_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        const {data} = await axios.get('/api/appointments/myappointments', config)

        dispatch({type: 'MY_APPOINTMENTS_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'MY_APPOINTMENTS_FAIL', payload: error.message})
    }
}


//USER-CREATED NEW APPOINTMENT
export const createAppointment = (serviceId, appointmentDate, appointmentTime, note) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'CREATE_APPOINTMENT_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //POST API DATA
        const {data} = await axios.post('/api/appointments',{serviceId, appointmentDate, appointmentTime, note} ,config)

        dispatch({type: 'CREATE_APPOINTMENT_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'CREATE_APPOINTMENT_FAIL', payload: error.message})
    }
}


//ADMIN-UPDATED APPOINTMENT
export const updateAppointment = (passed, action) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'UPDATE_APPOINTMENT_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //PUT API DATA
        const {data} = await axios.put(`/api/appointments/${passed}`,{passed, action} ,config)

        dispatch({type: 'UPDATE_APPOINTMENT_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'UPDATE_APPOINTMENT_FAIL', payload: error.message})
    }
}

//APPOINTMENTS BY DAY
export const appointmentByDay = (date) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'APPOINTMENT_DAY_LIST_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //PUT API DATA
        const {data} = await axios.get(`/api/appointments/day/${date}`,config)

        dispatch({type: 'APPOINTMENT_DAY_LIST_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'APPOINTMENT_DAY_LIST_FAIL', payload: error.message})
    }
}