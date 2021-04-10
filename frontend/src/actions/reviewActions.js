import axios from 'axios'

export const listReviews = () => async (dispatch) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'REVIEW_LIST_REQUEST'})
        const {data} = await axios.get('/api/reviews')

        dispatch({type: 'REVIEW_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'REVIEW_LIST_FAIL', payload: error.message})
    }
}