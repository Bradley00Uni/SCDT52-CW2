import React from 'react'
import FormContainer from '../Components/FormContainer'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl } from 'react-bootstrap'



const RegisterScreen = () => {
    return (
        <div>
            <FormContainer>
                <h1 className='py-3'>Sign Up!</h1>
                <Form>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <FormControl
                            type='name'
                            placeholder='Enter name...'
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <FormControl
                            type='email'
                            placeholder='Enter email...'
                        ></FormControl>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Enter password...'
                        ></FormControl>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Confirm password...'
                        ></FormControl>
                    </Form.Group>
                    <Button
                        type='submit'
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
