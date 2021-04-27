import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../Components/Loader'
import ErrorMessage from '../../Components/ErrorMessage'

import { listAppointments, updateAppointment} from '../../actions/appointmentActions'

const ManageAppointmentsScreen = ({history}) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const appointmentList = useSelector(state => state.appointmentList)
    const {allLoading, allError, allAppointments} = appointmentList

    const updateAppointments = useSelector(state => state.appointmentUpdate)
    const {success} = updateAppointments

    useEffect(()=>{
        if(!userInfo || userInfo.length < 1 || !userInfo.isAdmin || error){
            history.push('/')
            alert('Unauthorised Access');
        }

        dispatch(listAppointments())
    },[dispatch, history])

    const ConfirmAppointment = (appointment) => {
        const action = 'Confirm'
        dispatch(updateAppointment(appointment._id, action))
        window.location.reload()
    }

    const CompleteAppointment = (appointment) => {
        const action = 'Complete'
        dispatch(updateAppointment(appointment._id, action))
        window.location.reload()
    }

    const DeleteAppointment = (appointment) => {
        const action = 'Delete'
        dispatch(updateAppointment(appointment._id, action))
        window.location.reload()
    }


    return (
        <div>
            <Container>
                <h1 className='header-text'>ALL BOOKINGS</h1>
                {allLoading && <Loader />}
                {allError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                <Col sm={12} md={12} lg={12}>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead className='table-head'>
                        <tr>
                            <th>Reference</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Client</th>
                            <th>User</th>
                            <th>Style</th>
                            <th>Note</th>
                            <th>Confirmed</th>
                            <th>Complete</th>
                            <th>Confirm?</th>
                            <th>Complete?</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAppointments.map((appointment)=>(
                            <tr key={appointment._id}>
                               
                                <td>{appointment._id.slice(-5)}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>{appointment.name}</td>
                                <td>{appointment.user.slice(-4)}</td>
                                <td>{appointment.service}</td>
                                <td>{appointment.note}</td>
                                <td>{appointment.isConfirmed ? <p>Yes</p> : <p>No</p>}</td>
                                <td>{appointment.isComplete ? <p>Yes</p> : <p>No</p>}</td>
                                <td><Button onClick={()=>ConfirmAppointment(appointment)} className='btn btn-block btn-success'>Confirm?</Button></td>
                                <td><Button onClick={()=>CompleteAppointment(appointment)} className='btn btn-block btn-info'>Complete</Button></td>
                                <td><Button onClick={()=>DeleteAppointment(appointment)} className='btn btn-block btn-danger'>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Container>
        </div>
    )
}

export default ManageAppointmentsScreen
