import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from "react-datepicker"

import Service from '../Components/Service'

import {createAppointment, appointmentByDay} from '../actions/appointmentActions'
import {listServices} from '../actions/serviceActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
import { getDay } from 'date-fns'

require('react-datepicker/dist/react-datepicker.css')

const AppointmentScreen = ({history}) => {

    const [service, setService] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')

    const [calendarDate, setCalendarDate] = useState('')

    const [dateOpen, setDateOpen] = useState(false)
    const [timeOpen, setTimeOpen] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const availableAppointments = useSelector(state => state.appointmentByDay)
    const {loading, error, dayAppointments} = availableAppointments

    const serviceList = useSelector(state => state.serviceList) 
    const {serviceLoading,serviceError, services} = serviceList

    const serviceFind = useSelector(state => state.serviceFind)
    const {serviceFound} = serviceFind

    useEffect(()=>{

        dispatch(listServices())
        if(!userInfo || userInfo.length < 1){
            history.push('/') 
            alert('Please Login or Register to book an Appointment');
        }
    },[history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(service, date, time, note)
        dispatch(createAppointment(service, date, time, note))
    }

    const minmiseForm = () => {
        setDateOpen(!dateOpen)

        if(timeOpen){
            setTimeOpen(!timeOpen)
        }
    }

    const getTimes = () => {
        var dateToFormat = calendarDate
        var month = dateToFormat.toString().slice(4,7)
        var day = dateToFormat.toString().slice(8,10)
        var year = dateToFormat.toString().slice(11,15)

        switch(month){
            case 'Jan':
                month='01'
                break;
            case 'Feb':
                month='02'
                break;
            case 'Mar':
                month='03'
                break;
            case 'Apr':
                month='04'
                break;
            case 'May':
                month='05'
                break; 
            case 'Jun':
                month='06'
                break;   
            case 'Jul':
                month='07'
                break;
            case 'Aug':
                month='08'
                break;
            case 'Sep':
                month='09'
                break;
            case 'Oct':
                month='10'
                break;
            case 'Nov':
                month='11'
                break; 
            case 'Dec':
                month='12'
                break;   
        }

        var formattedDate = year + '-' + month + '-' + day
        
        dispatch(appointmentByDay(formattedDate))
        setDate(formattedDate)

        if(!timeOpen){
            setTimeOpen(!timeOpen)
        }
    }

    const openDays = (date) => {
        const day = getDay(date)
        return day !== 0 && day !==1
    }

    const checkService = (ser) => {
        console.log(ser)
        for (var i = 0; i < services.length; i++){
            if(ser == services[i].service){
                var chosenService = services[i]._id
                setService(chosenService)
                console.log(service)
            }
        }
    }
    return (
        <div>
            <h1 className='text-center header-text'>Book Appointment</h1>

            <FormContainer>
                <Form onSubmit={submitHandler} className='appointment-form'>              
                    <Row>
                        <Col sm={12} md={4} lg={4}>
                            <h4>Pick a Service</h4>
                        </Col>
                        <Col sm={12} md={8} lg={8}>
                            <Form.Group controlId='service'>                
                                <FormControl
                                as='select'
                                placeholder='service ID'
                                selected={service}
                                onChange={(e)=>checkService(e.target.value)}
                                >
                                 {services.map(choice => (
                                     <option>{choice.service}</option>
                                 ))}    
                                </FormControl>    
                            </Form.Group>
                        </Col>          
                    </Row>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Button
                            onClick={() => minmiseForm()}
                            aria-controls="example-collapse-text"
                            aria-expanded={dateOpen}
                            className='btn btn-block rounded btn-info'
                            >Set Service
                            </Button>
                        </Col>
                    </Row>
                  
                    <Row  className='form-divide'> 
                        <Col sm={12} md={4} lg={4}>
                            <Collapse in={dateOpen}><h4>Set the Date</h4></Collapse>
                        </Col>               
                        <Col sm={12} md={8} lg={8}>
                            <Collapse in={dateOpen}>
                                <Form.Group controlId='date'>
                                    <DatePicker
                                    id='date-calendar'
                                    filterDate={openDays}
                                    placeholderText="Click to select a date"
                                    selected={calendarDate}
                                    onChange={dates => setCalendarDate(dates)}
                                    minDate={new Date()}
                                    />
                                </Form.Group>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Collapse in={dateOpen}>
                                <Button
                                onClick={() => getTimes()}
                                aria-controls="example-collapse-text"
                                aria-expanded={dateOpen}
                                className='btn btn-block rounded btn-info'
                                >Set Date
                                </Button>
                            </Collapse>
                        </Col>
                    </Row>
                                      
                    <Row  className='form-divide'>
                        <Col sm={12} md={4} lg={4}>
                            <Collapse in={timeOpen}><h4>Open Slots</h4></Collapse>
                        </Col>       
                        <Col sm={12} md={8} lg={8}>
                            <Collapse in={timeOpen}>
                            {loading ? (<Loader />) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                                <Form.Group controlId='time'>
                                    <FormControl
                                    as='select'
                                    placeholder='Date'
                                    selected={time}
                                    onChange={(e)=>setTime(e.target.value)}
                                    >
                                        {dayAppointments ? (
                                            dayAppointments.map(choice => (
                                            <option>{choice}</option>
                                            ))                    
                                        ) : (
                                            <p>No Times</p>
                                        )}
                                    </FormControl>
                                </Form.Group>
                            )}
                            </Collapse>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Collapse in={timeOpen}>
                                <Button
                                aria-controls="example-collapse-text"
                                className='btn btn-block rounded btn-info'
                                >Set Time
                                </Button>
                            </Collapse>
                        </Col>
                    </Row>

                    <Row className='form-note-divide'>
                        <Col sm={12} md={12} lg={12}>
                            <h4>Leave a Note?</h4>
                        </Col>
                        <Col sm={12} md={12} lg={12}>
                            <Form.Control 
                            as="textarea" 
                            placeholder='Leave a small note if there is anything else you may want to express (100 Character Max)' 
                            rows={3}
                            maxLength='100'
                            onChange={(e)=>setNote(e.target.value)} 
                            />
                        </Col>
                    </Row>                        

                    <Row>
                        <Col sm={12} md={12} lg={12}>
                                <Button
                                onClick={submitHandler}
                                className='btn btn-block rounded btn-success form-divide'
                                >Book Appointment
                                </Button>   
                        </Col>
                    </Row>

                </Form>
            </FormContainer>

            <Row>
                <hr class="section-divide col-md-12" id="first-divide"/>
            </Row>
            <h2 class="header-text">What's Available</h2>
            <Row>
            {serviceLoading ? (<Loader />) : serviceError ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                <Row>
                    {services.map(service => (
                    <Col sm={12} md={4} lg={3}>
                        <Service service={service} />
                    </Col>
                    ))}
                </Row>
            )}
            </Row>
        </div>
    )
}

export default AppointmentScreen
