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
    const {loading, error, dayAppointments} = availableAppointments


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

    const getTimes = () => {
        dispatch(appointmentByDay(date))
        setTimeOpen(!timeOpen)
        console.log(dayAppointments)
    }



    return (
        <div>
            <h1 className='text-center'>Book Appointment</h1>

            <FormContainer>
                <Form onSubmit={submitHandler}>
                <h4>Pick a Service</h4>
                    <Row>
                        <Col sm={12} md={8} lg={8}>
                            <Form.Group controlId='service'>                
                                <FormControl
                                type='service'
                                placeholder='service ID'
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

                    <Collapse in={dateOpen}><h4>Choose the Date</h4></Collapse>                  
                    <Row>                
                        <Col sm={12} md={8} lg={8}>
                            <Collapse in={dateOpen}>
                                <Form.Group controlId='date'>
                                    <FormControl
                                    placeholder='Date'
                                    onChange={(e)=>setDate(e.target.value)}
                                    ></FormControl>
                                </Form.Group>
                            </Collapse>
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                            <Collapse in={dateOpen}>
                                <Button
                                onClick={() => getTimes()}
                                aria-controls="example-collapse-text"
                                aria-expanded={dateOpen}
                                className='btn btn-block rounded'
                                variant='primary'>Set Date
                                </Button>
                            </Collapse>
                        </Col>
                    </Row>

                    <Collapse in={timeOpen}><h4>Choose the Date</h4></Collapse>                  
                    <Row>                
                        <Col sm={12} md={8} lg={8}>
                            <Collapse in={timeOpen}>
                            {loading ? (<Loader />) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                                <Form.Group controlId='service'>
                                    <FormControl
                                    as='select'
                                    placeholder='Date'
                                    onChange={(e)=>setTime(e.target.value)}
                                    >
                                        {dayAppointments ? (
                                            dayAppointments.map(choice => (
                                            <option>{choice}</option>
                                            ))                    
                                        ) : (
                                            <p>d</p>
                                        )}
                                    </FormControl>
                                </Form.Group>
                            )}
                            </Collapse>
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                            <Collapse in={timeOpen}>
                                <Button
                                onClick={() => getTimes()}
                                aria-controls="example-collapse-text"
                                className='btn btn-block rounded'
                                variant='primary'>Set Time
                                </Button>
                            </Collapse>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </div>
    )
}

export default AppointmentScreen
