import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {updatePassword, getUserDetails, logout} from '../actions/userActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
import ReviewFormContainer from '../Components/ReviewFormContainer'

const PasswordEditScreen = ({history}) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, userError, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const passwordUpdate = useSelector(state => state.updatePassword)
    const {passwordLoading, passwordError, success} = passwordUpdate

    const submitHandler = (e) => {
        e.preventDefault()
        const currentUser = userInfo._id

        if(newPassword !== confirmPassword){
            setMessage('Passwords Do not Match!')
        }
        else if(newPassword == currentPassword){
            setMessage('Password could not be Updated - Cannot update to current Password')
        }
        else{
            dispatch(updatePassword(currentUser, currentPassword, newPassword))
            if(passwordError){
                setMessage('Password could not be Updated')
            }
            else{
                history.push('/')
                alert('Password Updated')
                setMessage('')
                dispatch(logout())
            }
        }
    }

    return (
        <div>
            <Container>
                <ReviewFormContainer>
                    <Form onSubmit={submitHandler} className='passwordChange-form'>
                        <h1 className='header-text'>Update your Password</h1>
                        {passwordLoading && <Loader />}
                        {message && <ErrorMessage variant ='warning'>{message}</ErrorMessage>}

                        <Row className='password-form-row-top'>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className='contact-header'>Current Password</h2>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <FormControl
                                placeholder='enter your current password'
                                size='lg'
                                onChange={(e)=>setCurrentPassword(e.target.value)}
                                ></FormControl>
                            </Col>
                        </Row>

                        <Row className='password-form-row'>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className='contact-header'>New Password</h2>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <FormControl
                                placeholder='choose a new password'
                                size='lg'
                                onChange={(e)=>setNewPassword(e.target.value)}
                                ></FormControl>
                            </Col>
                        </Row>

                        <Row className='password-form-row'>
                            <Col sm={12} md={6} lg={6}>
                                <h2 className='contact-header'>Confirm Password</h2>
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <FormControl
                                placeholder='confirm your new password'
                                size='lg'
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                ></FormControl>
                            </Col>
                        </Row>
                    </Form>

                    <Row className='password-form-row'>
                            <Col sm={12} md={12} lg={12}>
                                <Button
                                onClick={submitHandler}
                                size='lg'
                                className='btn btn-block rounded btn-success'
                                >Update Password
                                </Button> 
                            </Col>
                        </Row>
                </ReviewFormContainer>
            </Container>
        </div>
    )
}

export default PasswordEditScreen
