import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../Components/Loader'
import ErrorMessage from '../../Components/ErrorMessage'

import ReviewFormContainer from '../../Components/ReviewFormContainer'

import {listServices, findService, createService} from '../../actions/serviceActions'

const ManageServicesScreen = ({history}) => {

    const [haircut, setHaircut] = useState('')
    const [price, setPrice] = useState('')
    const [duration, setDuration] = useState('')
    const [image, setImage] = useState('')

    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [deleteSuccess, setDeleteSuccess] = useState('')
    const [formShow, setFormShow] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const serviceList = useSelector(state => state.serviceList) 
    const {serviceLoading,serviceError, services} = serviceList

    const serviceFind = useSelector(state => state.serviceFind)
    const {findLoading, findError, serviceFound} = serviceFind

    const serviceCreate = useSelector(state => state.createService)
    const {createLoading, createError, service} = serviceCreate

    useEffect(()=>{
        if(!userInfo || userInfo.length < 1 || !userInfo.isAdmin || error){
            history.push('/')
            alert('Unauthorised Access');
        }
        dispatch(listServices())
        setFormShow(true)
    },[dispatch, history])

    const submitHandler = (e) => {
        e.preventDefault()

        if(image.includes('images/cuts/')){
            dispatch(createService(haircut, price, duration, image))

            if(service.length > 1){
                setMessage('')
                setSuccess('Service Added')
                setFormShow(false)
            }
            else{
                setSuccess('')
                setMessage('Invalid Data')
            }
        }
        else{
            setMessage('Please Enter a Valid Image URL')
            setSuccess('')
        }
    }


    const DeleteService = (service) => {
        dispatch(findService(service))

        if(serviceFound){
            setMessage('')
            setSuccess('')
            setDeleteSuccess('Service Deleted')
            dispatch(listServices())
        }
        else{
            if(findError){
                setMessage(findError)
            }
            else{
                setMessage('Delete Error - try again later')
            }
            setDeleteSuccess('')
        }
        

    }

    

    return (
        <div>
            <Container>
                {deleteSuccess && <ErrorMessage variant ='warning'>{deleteSuccess}</ErrorMessage>}
                <h1 className='header-text'>ALL SERVICES</h1>
                {serviceLoading && <Loader />}
                {serviceError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                <Col sm={12} md={12} lg={12}>
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

            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage> }
            
            <Container>
            {success && <ErrorMessage variant ='success'>{success}</ErrorMessage>}
            <ReviewFormContainer>
                <Collapse in={formShow}>
                <Form onSubmit={submitHandler} className='service-form'>
                    <h1 className='header-text'>ADD A SERVICE</h1>
                    <Row className='service-form-row'>
                        <Col sm={6} md={6} lg={2}>
                            <h4>Haircut</h4>
                        </Col>
                        <Col sm={6} md={6} lg={4}>
                            <FormControl
                            placeholder='Haircut'
                            maxLength='40'
                            onChange={(e)=>setHaircut(e.target.value)}
                            ></FormControl>
                        </Col>
                        <Col sm={6} md={6} lg={4}>
                            <FormControl
                            placeholder='Price (£)'
                            onChange={(e)=>setPrice(e.target.value)}
                            ></FormControl>
                        </Col>
                        <Col sm={6} md={6} lg={2}>
                            <h4>Price</h4>
                        </Col>
                    </Row>

                    <Row className='service-form-row'>
                        <Col sm={6} md={6} lg={2}>
                            <h4>Image URL</h4>
                        </Col>
                        <Col sm={6} md={6} lg={4}>
                            <FormControl
                            placeholder='images/cuts/(ImageURL)'
                            maxLength='40'
                            onChange={(e)=>setImage(e.target.value)}
                            ></FormControl>
                        </Col>
                        <Col sm={6} md={6} lg={4}>
                            <FormControl
                            placeholder='Duration (minutes)'
                            onChange={(e)=>setDuration(e.target.value)}
                            ></FormControl>
                        </Col>
                        <Col sm={6} md={6} lg={2}>
                            <h4>Duration</h4>
                        </Col>
                    </Row>

                    <Row className='service-form-row'>
                        <Col md={1} lg={2}></Col>
                        <Col sm={12} md={10} lg={8}>
                                <Button
                                onClick={submitHandler}
                                size='lg'
                                className='btn btn-block rounded btn-success'
                                >Create Service
                                </Button>   
                        </Col>
                        <Col md={1} lg={2}></Col>
                    </Row>
                </Form>
                </Collapse>
            </ReviewFormContainer>
            </Container>
        </div>
    )
}

export default ManageServicesScreen
