import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

import { getUserDetails, logout } from '../actions/userActions'
import { myAppointments} from '../actions/appointmentActions'

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
                dispatch(myAppointments())
                setAdmin(false)
        }
    },[dispatch, history])


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
                                    <td>£{appointment.price}</td>
                                    <td>{appointment.duration}</td>
                                    <td>{appointment.note}</td>
                                    <td>{appointment.isConfirmed ? <p>Yes</p> : <p>No</p>}</td>
                                    <td>{appointment.isComplete ? <p>Yes</p> : <p>No</p>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    
        
}

export default AccountScreen
