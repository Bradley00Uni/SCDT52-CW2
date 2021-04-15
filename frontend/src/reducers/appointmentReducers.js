export const appointmentListReducer = (state = {allAppointments: []}, action) => {
    switch(action.type){
        case 'APPOINTMENT_LIST_REQUEST':
            return {loading:true, allAppointments:[]}
        case 'APPOINTMENT_LIST_SUCCESS':
            return {loading:false, allAppointments: action.payload}
        case 'APPOINTMENT_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}


export const myAppointmentReducer = (state = {appointments: []}, action) => {
    switch(action.type){
        case 'MY_APPOINTMENTS_REQUEST':
            return {loading:true, appointments:[]}
        case 'MY_APPOINTMENTS_SUCCESS':
            return {loading:false, appointments: action.payload}
        case 'MY_APPOINTMENTS_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}


export const createAppointmentReducer = (state = {appointment: {}}, action) => {
    switch(action.type){
        case 'CREATE_APPOINTMENT_REQUEST':
            return {loading:true, appointment: {}}
        case 'CREATE_APPOINTMENT_SUCCESS':
            return {loading:false, appointment: action.payload}
        case 'CREATE_APPOINTMENT_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}


export const appointmentByDayReducer = (state = {dayAppointments: []}, action) => {
    switch(action.type){
        case 'APPOINTMENT_DAY_LIST_REQUEST':
            return {loading:true, dayAppointments:[]}
        case 'APPOINTMENT_DAY_LIST_SUCCESS':
            return {loading:false, dayAppointments: action.payload}
        case 'APPOINTMENT_DAY_LIST_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state
    } 
}


export const appointmentConfirmReducer = (state = {}, action) => {
    switch(action.type){
        case 'CONFIRM_APPOINTMENT_REQUEST':
            return {loading:true}
        case 'CONFIRM_APPOINTMENT_SUCCESS':
            return {loading:false, success:true}
        case 'CONFIRM_APPOINTMENT_FAIL':
            return {loading: false, error: action.payload}
        case 'CONFIRM_APPOINTMENT_RESET':
            return {}
        default:
            return state
    } 
}