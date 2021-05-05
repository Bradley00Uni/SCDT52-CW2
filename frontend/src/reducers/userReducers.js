export const userLoginReducer = (state = {}, action) =>{

    switch(action.type){
        case 'USER_LOGIN_REQUEST':
            return {loading:true}
        case 'USER_LOGIN_SUCCESS':
            return {loading:false, userInfo: action.payload}
        case 'USER_LOGIN_FAIL':
            return {loading: false, error: action.payload}
        case 'USER_LOGOUT':
            return {}
        default:
            return state
    } 
}

export const userDetailsReducer = (state = {user:{}}, action) =>{

    switch(action.type){
        case 'USER_DETAILS_REQUEST':
            return {loading:true}
        case 'USER_DETAILS_SUCCESS':
            return {loading:false, user: action.payload}
        case 'USER_DETAILS_FAIL':
            return {loading: false, error: action.payload}
        case 'USER_DETAILS_RESET':
            return {
                user:{}
            }
        default:
            return state
    } 
}

export const userRegisterReducer = (state = {}, action) =>{

    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return {loading:true}
        case 'USER_REGISTER_SUCCESS':
            return {loading:false, userInfo: action.payload}
        case 'USER_REGISTER_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}

export const allUsersReducer = (state = {users:[]}, action) =>{
    switch(action.type){
        case 'ALL_USERS_REQUEST':
            return {loading:true, users:[]}
        case 'ALL_USERS_SUCCESS':
            return {loading:false, users: action.payload}
        case 'ALL_USERS_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}

export const deleteUserReducer = (state = {deletedUser:{}}, action) =>{
    switch(action.type){
        case 'DELETED_USER_REQUEST':
            return {deleteLoading:true, deletedUser:[]}
        case 'DELETED_USER_SUCCESS':
            return {deleteLoading:false, deletedUser: action.payload}
        case 'DELETED_USER_FAIL':
            return {deleteLoading: false, deleteError: action.payload}
        default:
            return state
    } 
}


export const updateUserReducer = (state = {}, action) =>{
    switch(action.type){
        case 'UPDATE_USER_REQUEST':
            return {loading:true}
        case 'UPDATE_USER_SUCCESS':
            return {loading:false, success:true}
        case 'UPDATE_USER_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}


export const updatePasswordReducer = (state = {}, action) =>{
    switch(action.type){
        case 'UPDATE_PASSWORD_REQUEST':
            return {loading:true}
        case 'UPDATE_PASSWORD_SUCCESS':
            return {loading:false, success:true}
        case 'UPDATE_PASSWORD_FAIL':
            return {loading: false, passwordError: action.payload}
        default:
            return state
    } 
}