import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

const AppointmentScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(()=>{

        if(!userInfo || userInfo.length < 1){
            history.push('/') 
            alert('Please Login or Register to book an Appointment')
        }
    },[history, userInfo])

    return (
        <div>
            <Container>
                
            </Container>
        </div>
    )
}

export default AppointmentScreen
