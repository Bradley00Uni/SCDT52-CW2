import axios from 'axios'

export const listServices = () => async (dispatch) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'SERVICE_LIST_REQUEST'})
        const {data} = await axios.get('/api/services')

        dispatch({type: 'SERVICE_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'SERVICE_LIST_FAIL', payload: error.message})
    }
}

export const findService = (service) => async (dispatch, getState) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'SERVICE_FIND_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        const {data} = await axios.post(`/api/services/${service._id}`, {service}, config)

        dispatch({type: 'SERVICE_FIND_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'SERVICE_FIND_FAIL', payload: error.message})
    }
}

//ADMIN-CREATED NEW APPOINTMENT
export const createService = (haircut, price, duration, image) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'SERVICE_CREATE_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //POST API DATA
        const {data} = await axios.post('/api/services',{haircut, price, duration, image} ,config)

        dispatch({type: 'SERVICE_CREATE_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'SERVICE_CREATE_FAIL', payload: error.message})
    }
}