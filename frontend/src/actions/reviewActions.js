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


//USER-CREATED NEW REVIEW
export const createReview = (title, body, rating) => async (dispatch, getState) =>{
    try{
        dispatch({type: 'CREATE_REVIEW_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        //POST API DATA
        const {data} = await axios.post('/api/reviews',{title, body, rating} ,config)

        dispatch({type: 'CREATE_REVIEW_SUCCESS', payload: data})
    }
    catch(error){
        dispatch({type: 'CREATE_REVIEW_FAIL', payload: error.message})
    }
}