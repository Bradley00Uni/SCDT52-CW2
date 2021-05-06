import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {updateUser, getUserDetails, logout} from '../actions/userActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
import ReviewFormContainer from '../Components/ReviewFormContainer'

const AccountEditScreen = ({history}) => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    var currentEmail 
    var currentPhone 

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const updateSuccess = useSelector(state => state.updateUser)
    const {updateLoading, updateError,success} = updateSuccess

    useEffect(()=>{
       currentEmail = userInfo.email
       currentPhone = userInfo.phone
       if(!user){
           dispatch(getUserDetails('profile'))
       }

       if(!userInfo || userInfo.length < 1){
           history.push('/')
       }
       
    })

    
    const submitHandler = (e) => {
        const currentUser = userInfo._id

       if(!email){
            dispatch(updateUser(currentUser, currentEmail, phone))    
        }
        else if(!phone){
            dispatch(updateUser(currentUser, email, currentPhone))
        }
        else if(phone && email){
            dispatch(updateUser(currentUser, email, phone))
        }

        if(success){
            setMessage('Update Successful - please re-login to see changes')
        }

    }
    
    return (
        <div>
            <Container>
                <ReviewFormContainer>
                    <Form onSubmit={submitHandler} className='contactDetails-form'>
                        <h1 className='header-text'>Update your Contact Information</h1>
                        {updateError && <ErrorMessage variant='danger'>{error}</ErrorMessage> }
                        {updateLoading && <Loader />}
                        {message && <ErrorMessage variant ='success'>{message}</ErrorMessage>}

                        <Row className='service-form-row'>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className='header-text'>Current</h2>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className='header-text'>Update</h2>
                            </Col>
                        </Row>

                        <Row className='service-form-row'>
                            <Col sm={12} md={6} lg={6}>
                                <h3 className='contact-header'>{userInfo.phone}</h3>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <FormControl
                                placeholder='Phone Number'
                                maxLength='11'
                                size='lg'
                                onChange={(e)=>setPhone(e.target.value)}
                                ></FormControl>
                            </Col>
                        </Row>

                        <Row className='service-form-row'>
                            <Col sm={12} md={6} lg={6}>
                                <h3 className='contact-header'>{userInfo.email}</h3>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <FormControl
                                placeholder='Email Address'
                                maxLength='30'
                                size='lg'
                                onChange={(e)=>setEmail(e.target.value)}
                                ></FormControl>
                            </Col>
                        </Row>

                        <Row className='service-form-row'>
                            <Col sm={12} md={12} lg={12}>
                                <Button
                                onClick={submitHandler}
                                size='lg'
                                className='btn btn-block rounded btn-success'
                                >Update Details
                                </Button> 
                            </Col>
                        </Row>
                    </Form>
                </ReviewFormContainer>
            </Container>
        </div>
    )
}

export default AccountEditScreen
