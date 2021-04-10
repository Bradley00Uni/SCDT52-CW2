export const galleryListReducer = (state = {exampleCuts: []}, action) => {
    switch(action.type){
        case 'GALLERY_LIST_REQUEST':
            return {loading:true, exampleCuts:[]}
        case 'GALLERY_LIST_SUCCESS':
            return {loading:false, exampleCuts: action.payload}
        case 'GALLERY_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}