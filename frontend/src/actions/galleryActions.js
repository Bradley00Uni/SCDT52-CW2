import axios from 'axios'

//RETURN ALL OBJECTS IN GALLERY
export const listGallery = () => async (dispatch) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'GALLERY_DELETE_REQUEST'})
        const {data} = await axios.get('/api/cuts')

        dispatch({type: 'GALLERY_LIST_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'GALLERY_LIST_FAIL', payload: error.message})
    }
}


//ADMIN ONLY - CREATE NEW GALLERY OBJECT
export const galleryCreate = (caption, imageURL) => async (dispatch, getState) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'GALLERY_CREATE_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        const {data} = await axios.post('/api/cuts', {caption, imageURL}, config)

        dispatch({type: 'GALLERY_CREATE_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'GALLERY_CREATE_FAIL', payload: error.message})
    }
}


//ADMIN ONLY - DELETE A GALLERY OBJECT
export const galleryDelete = (image) => async (dispatch, getState) =>{
    try{
        //EXECUTES REDUCERS TO UPDATE STATE
        dispatch({type: 'GALLERY_LIST_REQUEST'})

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                Authorization: userInfo.token
            }
        }

        const {data} = await axios.post(`/api/cuts/${image._id}`, {image}, config)

        dispatch({type: 'GALLERY_DELETE_SUCCESS', payload: data})
    }
    catch(error){
        //SENDS ERROR MESSAGE
        dispatch({type: 'GALLERY_DELETE_FAIL', payload: error.message})
    }
}