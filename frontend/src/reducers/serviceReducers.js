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

export const createServiceReducer = (state = {service: {}}, action) => {
    switch(action.type){
        case 'SERVICE_CREATE_REQUEST':
            return {loading:true, service: {}}
        case 'SERVICE_CREATE_SUCCESS':
            return {loading:false, service: action.payload}
        case 'SERVICE_CREATE_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}