import axios from 'axios'

export const listImages = () => async (dispatch) =>{

    try{
        //dispatch executes reducers to update state
        //first one activates product list request
        dispatch({type: 'IMAGE_LIST_REQUEST'})

        //gets data from api
        const {data} = await axios.get('/api/cuts')

        //populates the response into a PAYLOAD
        dispatch({type: 'IMAGE_LIST_SUCCESS', payload: data})

    }
    catch(error){
        //sends error message
        dispatch({type: 'IMAGE_LIST_FAIL',
            payload: error.message
        })
    }
}