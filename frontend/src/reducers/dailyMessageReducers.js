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