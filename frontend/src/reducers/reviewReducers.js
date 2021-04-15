export const reviewListReducer = (state = {reviews: []}, action) => {
    switch(action.type){
        case 'REVIEW_LIST_REQUEST':
            return {loading:true, reviews:[]}
        case 'REVIEW_LIST_SUCCESS':
            return {loading:false, reviews: action.payload}
        case 'REVIEW_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}


export const createReviewReducer = (state = {review: {}}, action) => {
    switch(action.type){
        case 'CREATE_REVIEW_REQUEST':
            return {loading:true, review: {}}
        case 'CREATE_REVIEW_SUCCESS':
            return {loading:false, review: action.payload}
        case 'CREATE_REVIEW_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}