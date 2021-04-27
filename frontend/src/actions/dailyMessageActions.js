import axios from 'axios'

export const listMessages = () => async (dispatch) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'DAILY_MESSAGE_REQUEST'})
        const {data} = await axios.get('/api/messages')

        dispatch({type: 'DAILY_MESSAGE_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'DAILY_MESSAGE_FAIL', payload: error.message})
    }
}

//ADMIN-CREATED DAILY MESSAGE
export const createDailyMessage = (messageText) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'DAILY_MESSAGE_CREATE_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //POST API DATA
        const {data} = await axios.post('/api/messages',{messageText} ,config)

        dispatch({type: 'DAILY_MESSAGE_CREATE_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'DAILY_MESSAGE_CREATE_FAIL', payload: error.message})
    }
}


export const deleteDailyMessage = (dailyMessage) => async (dispatch, getState) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'DAILY_MESSAGE_DELETE_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        const {data} = await axios.post(`/api/messages/${dailyMessage._id}`, dailyMessage, config)

        dispatch({type: 'DAILY_MESSAGE_DELETE_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'DAILY_MESSAGE_DELETE_FAIL', payload: error.message})
    }
}