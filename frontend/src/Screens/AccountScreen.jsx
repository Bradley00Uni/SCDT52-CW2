import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

import { getUserDetails, logout } from '../actions/userActions'
import { listAppointments, myAppointments, confirmAppointment } from '../actions/appointmentActions'

const AccountScreen = ({history}) => {

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const personalAppointments = useSelector(state => state.myAppointment)
    const {appointmentLoading, appointmentError, appointments} = personalAppointments

    const appointmentList = useSelector(state => state.appointmentList)
    const {allLoading, allError, allAppointments} = appointmentList

    const confirmAppointments = useSelector(state => state.appointmentConfirm)
    const {success} = confirmAppointments
    

    useEffect(()=>{

        if(!userInfo || userInfo.length < 1 || error){
            history.push('/login')
           dispatch(logout())
        }

        if(!user || !user.name){
            dispatch(getUserDetails('profile'))
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }

        if(user){
            if(userInfo.isAdmin){
                dispatch(listAppointments())
                setAdmin(true)
            }
            else{
                dispatch(myAppointments())
                setAdmin(false)
            }
        }
    },[dispatch, history])

    const ConfirmAppointment = (appointment) => {
        dispatch(confirmAppointment(appointment))
        window.location.reload()
    }

    if(!userInfo.isAdmin){
        return (
            <div>
                <Container>
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    <Row>
                        <Col>
                            <h1 className='header-text'>{userInfo.name}'s Account</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className='account-details'><strong><i>Email Address</i></strong></h3>
                            <h3 className='account-details'>{userInfo.email}</h3>
                        </Col>
                        <Col>
                            <h3 className='account-details'><strong><i>Contact Number</i></strong></h3>
                            <h3 className='account-details'>{userInfo.phone}</h3>
                        </Col>
                    </Row>
                    <Row className="button-row">
                        <Col sm={1} md={3} lg={2} />
                        <Col sm={10} md={6} lg={8} className="align-items-center">
                            <Link to=''><Button href='#top' variant='outline-info' size='lg' block>Edit your Details </Button></Link>
                        </Col>
                        <Col sm={1} md={3} lg={2} />
                    </Row>
                </Container>

                <Row>
                    <hr class="section-divide col-md-12"/>
                </Row>
    
                <Container>
                    <h1 className='header-text'>Booked Appointments</h1>
                    {appointmentLoading && <Loader />}
                    {appointmentError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
    
                    <Table bordered hover striped responsive className='table-sm'>
                        <thead className='table-head'>
                            <tr>
                                <th>Booking Reference</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Style</th>
                                <th>Price</th>
                                <th>Duration (Minutes)</th>
                                <th>Note</th>
                                <th>Confirmed</th>
                                <th>Paid</th>
                                <th>Complete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment)=>(
                                <tr key={appointment._id}>
                                   
                                    <td>{appointment._id.slice(-5)}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.service}</td>
                                    <td>{appointment.price}</td>
                                    <td>{appointment.duration}</td>
                                    <td>{appointment.note}</td>
                                    <td>{appointment.isConfirmed ? <p>Yes</p> : <p>No</p>}</td>
                                    <td>{appointment.isPaid ? <p>Yes</p> : <p>No</p>}</td>
                                    <td>{appointment.isComplete ? <p>Yes</p> : <p>No</p>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
    else{
        return (
            <div>
                <Container>
                    {loading && <Loader />}
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    <Row>
                        <Col>
                            <h1>My Account</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p><strong>Account Name:</strong>{userInfo.name}</p>
                            <p><strong>Email:</strong>{userInfo.email}</p>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <h1>ADMIN PANEL - ALL BOOKINGS</h1>
                    {allLoading && <Loader />}
                    {allError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
    
                    <Col sm={12} md={10} lg={12}>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Booking Reference</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Client</th>
                                <th>Style</th>
                                <th>Price</th>
                                <th>Duration (Minutes)</th>
                                <th>Note</th>
                                <th>Confirmed</th>
                                <th>Paid</th>
                                <th>Confirm?</th>
                                <th>Paid?</th>
                                <th>Complete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAppointments.map((appointment)=>(
                                <tr key={appointment._id}>
                                   
                                    <td>{appointment._id.slice(-5)}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.service}</td>
                                    <td>{appointment.price}</td>
                                    <td>{appointment.duration}</td>
                                    <td>{appointment.note}</td>
                                    <td>{appointment.isConfirmed ? <p>Yes</p> : <p>No</p>}</td>
                                    <td>{appointment.isPaid ? <p>Yes</p> : <p>No</p>}</td>
                                    <td><Button onClick={()=>ConfirmAppointment(appointment)} className='btn btn-block btn-success'>Confirm?</Button></td>
                                    <td><Button onClick='' className='btn btn-block btn-primary'>Paid?</Button></td>
                                    <td><Button onClick='' className='btn btn-block btn-danger'>Complete?</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default AccountScreen
