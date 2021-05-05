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


export const galleryCreateReducer = (state = {newCut: {}}, action) => {
    switch(action.type){
        case 'GALLERY_CREATE_REQUEST':
            return {createLoading:true, newCut:{}}
        case 'GALLERY_CREATE_SUCCESS':
            return {createLoading:false, newCuts: action.payload}
        case 'GALLERY_CREATE_FAIL':
            return {createLoading: false, createError: action.payload}
        default:
            return state
    } 
}

export const galleryDeleteReducer = (state = {deletedCut: {}}, action) => {
    switch(action.type){
        case 'GALLERY_DELETE_REQUEST':
            return {deleteLoading:true, deletedCut:{}}
        case 'GALLERY_DELETE_SUCCESS':
            return {deleteLoading:false, deletedCut: action.payload}
        case 'GALLERY_DELETE_FAIL':
            return {deleteLoading: false, deleteError: action.payload}
        default:
            return state
    } 
}