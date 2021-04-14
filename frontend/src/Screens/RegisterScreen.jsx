import React, { useState, useEffect } from 'react'
import FormContainer from '../Components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import {register, logout} from '../actions/userActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
const RegisterScreen = ({history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pNumber, setPNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push('/account')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Passwords Do not Match!')
        }
        else{
            dispatch(register(name, email, pNumber, password))
            
        }
    }

    return (
        <div>
            <FormContainer>
                <h1 className='py-3'>Sign Up!</h1>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage> }
                {loading && <Loader />}
                {message && <ErrorMessage variant ='info'>{message}</ErrorMessage>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <FormControl
                            type='name'
                            placeholder='Enter name...'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <FormControl
                            type='email'
                            placeholder='Enter email...'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='phone'>
                        <Form.Label>Phone Number</Form.Label>
                        <FormControl
                            type='phone'
                            placeholder='Enter contact number...'
                            value={pNumber}
                            onChange={(e)=>setPNumber(e.target.value)}
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Enter password...'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Confirm password...'
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        ></FormControl>
                    </Form.Group>
                    <Button
                        onClick={submitHandler}
                        className='btn btn-block rounded'
                        variant='primary'>Register</Button>


                </Form>
                <Row className="py-3">
                    <Col>
                        Have an account? <Link to="/login">Sign In!</Link>

                    </Col>

                </Row>

            </FormContainer>

        </div>
    )
}

export default RegisterScreen
