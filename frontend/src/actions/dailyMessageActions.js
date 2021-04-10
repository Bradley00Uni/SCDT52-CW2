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