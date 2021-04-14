import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

import { getUserDetails, logout } from '../actions/userActions'

const AccountScreen = ({history}) => {

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{

        if(!userInfo || userInfo.length < 1 || error){
            history.push('/')
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

    },[dispatch, history])

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
        </div>
    )
}

export default AccountScreen
