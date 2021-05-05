import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'

import {login} from '../actions/userActions'
import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'


const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if(userInfo && userInfo._id){
            history.push('/')
        }

    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(email,password))
    }

    return (
        <FormContainer>
            <h1 className='py-3'>Sign In!</h1>

            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type='email'
                        placeholder='Enter email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                        type='password'
                        placeholder='Enter password...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
                
                {loading && <Loader />}


            </Form>
            <Row className="py-3">
                <Col>
                    Don't have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign Up</Link>

                </Col>

            </Row>

        </FormContainer>
    )
}

export default LoginScreen
