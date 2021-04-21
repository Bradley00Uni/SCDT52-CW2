import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../Components/Loader'
import ErrorMessage from '../../Components/ErrorMessage'

import {listServices, findService} from '../../actions/serviceActions'

const ManageServicesScreen = ({history}) => {

    const [service, setService] = useState('')
    const [price, setPrice] = useState('')
    const [duration, setDuration] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const serviceList = useSelector(state => state.serviceList) 
    const {serviceLoading,serviceError, services} = serviceList

    const serviceFind = useSelector(state => state.serviceFind)
    const {serviceFound} = serviceFind

    useEffect(()=>{
        if(!userInfo || userInfo.length < 1 || !userInfo.isAdmin || error){
            history.push('/')
            alert('Unauthorised Access');
        }

        dispatch(listServices())
    },[dispatch, history])


    const DeleteService = (service) => {
        dispatch(findService(service))
        window.location.reload()
    }

    return (
        <div>
            <Container>
                <h1 className='header-text'>ALL SERVICES</h1>
                {serviceLoading && <Loader />}
                {serviceError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                <Col sm={12} md={10} lg={12}>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead className='table-head'>
                        <tr>
                            <th>ID</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Duration (Minutes)</th>
                            <th>imageURL</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service)=>(
                            <tr key={service._id}>
                               
                                <td>{service._id}</td>
                                <td>{service.service}</td>
                                <td>£{service.price}</td>
                                <td>{service.duration}</td>
                                <td>{service.imageURL}</td>
                                <td><Button onClick={()=>DeleteService(service)} className='btn btn-block btn-danger'>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Container>

            <Container>
            <   h1 className='header-text'>ADD A SERVICE</h1>
            </Container>
        </div>
    )
}

export default ManageServicesScreen
