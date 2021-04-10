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