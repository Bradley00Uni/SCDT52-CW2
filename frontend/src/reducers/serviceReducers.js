export const serviceListReducer = (state = {services: []}, action) => {
    switch(action.type){
        case 'SERVICE_LIST_REQUEST':
            return {loading:true, services:[]}
        case 'SERVICE_LIST_SUCCESS':
            return {loading:false, services: action.payload}
        case 'SERVICE_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}

export const serviceFindReducer = (state = {serviceFound:{}}, action) => {
    switch(action.type){
        case 'SERVICE_FIND_REQUEST':
            return {loading:true}
        case 'SERVICE_FIND_SUCCESS':
            return {loading:false, serviceFound: action.payload}
        case 'SERVICE_FIND_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}