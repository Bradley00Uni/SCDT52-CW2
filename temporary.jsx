import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {createAppointment, appointmentByDay} from '../actions/appointmentActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

const AppointmentScreen = ({history}) => {

    const [service, setService] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')
    const [message, setMessage] = useState('')

    const [dateOpen, setDateOpen] = useState(false)
    const [timeOpen, setTimeOpen] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const availableAppointments = useSelector(state => state.appointmentByDay)
    const {available} = availableAppointments

    function checkAvailable(newDate){
        var newTimes =  dispatch(appointmentByDay(newDate))
        return newTimes
    }

    useEffect(()=>{

        if(!userInfo || userInfo.length < 1){
            history.push('/') 
            alert('Please Login or Register to book an Appointment')
        }
    },[history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createAppointment(service, date, time, note))
    }

    return (
        <div>
            <FormContainer>
                <h1>Book Appointment</h1>
                <Form onSubmit={submitHandler}>
                    <Row>
                    <Col sm={12} md={8} lg={8}>
                    <Form.Group controlId='service'>                
                        <FormControl
                        type='service'
                        placeholder='service ID'
                        value={service}
                        onChange={(e)=>setService(e.target.value)}
                        ></FormControl>    
                    </Form.Group>
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <Button
                        onClick={() => setDateOpen(!dateOpen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={dateOpen}
                        className='btn btn-block rounded'
                        variant='primary'>Set Service
                        </Button>
                    </Col>
                    </Row>
                    <Collapse in={dateOpen}>
                    <Form.Group controlId='service'>
                        <Form.Label>Date</Form.Label>
                        <FormControl
                        type='date'
                        placeholder='Date'
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    </Collapse>
                    <Form.Group controlId='service'>
                        <Form.Label>Time</Form.Label>
                        <FormControl as='select'
                        type='time'
                        placeholder='service ID'
                        value={service}
                        onChange={(e)=>setService(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                </Form>
            </FormContainer>
        </div>
    )
}

export default AppointmentScreen
