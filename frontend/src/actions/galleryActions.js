import axios from 'axios'

export const listGallery = () => async (dispatch) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'GALLERY_LIST_REQUEST'})
        const {data} = await axios.get('/api/cuts')

        dispatch({type: 'GALLERY_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'GALLERY_LIST_FAIL', payload: error.message})
    }
}