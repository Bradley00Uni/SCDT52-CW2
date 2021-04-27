export const dailyMessagesReducer = (state = {dailyMessages: []}, action) => {
    switch(action.type){
        case 'DAILY_MESSAGE_REQUEST':
            return {loading:true, dailyMessages:[]}
        case 'DAILY_MESSAGE_SUCCESS':
            return {loading:false, dailyMessages: action.payload}
        case 'DAILY_MESSAGE_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}

export const createDailyMessageReducer = (state = {dailyMessage: {}}, action) => {
    switch(action.type){
        case 'DAILY_MESSAGE_CREATE_REQUEST':
            return {loading:true, dailyMessage: {}}
        case 'DAILY_MESSAGE_CREATE_SUCCESS':
            return {loading:false, dailyMessage: action.payload}
        case 'DAILY_MESSAGE_CREATE_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const deleteDailyMessageReducer = (state = {foundMessage: {}}, action) => {
    switch(action.type){
        case 'DAILY_MESSAGE_DELETE_REQUEST':
            return {loading:true}
        case 'DAILY_MESSAGE_DELETE_SUCCESS':
            return {loading:false, foundMessage: action.payload}
        case 'DAILY_MESSAGE_DELETE_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    }
}