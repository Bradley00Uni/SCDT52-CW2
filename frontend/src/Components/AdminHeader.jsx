import React, {useEffect} from 'react'

import banner from '../siteImages/grunge_banner.png'
import {Nav, Navbar, Image, Row, Col, Button, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import {useDispatch, useSelector} from 'react-redux'

import {listMessages} from '../actions/dailyMessageActions'
import DailyMessage from './DailyMessage'

import {logout} from '../actions/userActions'

const Header = ({match, history}) => {

    const dispatch = useDispatch()

    const newMessage = useSelector(state => state.dailyMessages)
    const {loading, error, dailyMessages} = newMessage

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () =>{
        console.log('logged out')
        dispatch(logout())
    }

    var showButton
    var loginText
    if(!userInfo || userInfo.length < 1){
        showButton = false
        loginText = 'Login/Register'
    }
    else{
        showButton = true
        loginText = 'Account'
    }

    useEffect(()=>{
        dispatch(listMessages())
    }, [dispatch])


    return (
        <>
        <Row className="col-md-12">
            <Image className="col-md-12" src={banner} />
        </Row>
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto align-nav">
                <Link to='/'></Link> <Nav.Link className="nav-text" href="/" class="navItem">Home</Nav.Link>
                <Link to='/reviews'></Link><Nav.Link className="nav-text" href="/reviews" class="navItem">Testimonials</Nav.Link>
                <Link to='/appointment'></Link><Nav.Link className="nav-text" href="/appointment" class="navItem">Book an Appointment</Nav.Link>
                <Link to='gallery'></Link><Nav.Link className="nav-text" href="/gallery" class="navItem">Gallery</Nav.Link>
                <Link to='/contact'></Link><Nav.Link className="nav-text" href="/contact" class="navItem">Contact Me</Nav.Link>
                <NavDropdown title="Admin Panel" id='navbarDropdown'>
                    <NavDropdown.Item className='drop-text' href="/admin/appointments">Appointments</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/messages" className="drop-text">Daily Messages</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/gallery" className="drop-text">Gallery</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/services" className="drop-text">Services</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/users" className="drop-text">Users</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="nav-text" href="/account">Your {loginText}</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            { showButton && <LinkContainer to='/'><Button className='btn btn-danger mx-3' onClick={logoutHandler}>Logout</Button></LinkContainer>}

            </Navbar.Collapse>
        </Navbar>

            {dailyMessages.slice((dailyMessages.length)-1,).map(dailyMessage => (
                <Col>
                    <DailyMessage dailyMessage={dailyMessage} />
                </Col>
                ))}

        </>
    )
}

export default Header
