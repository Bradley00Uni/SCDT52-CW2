import React, {useEffect} from 'react'

import banner from '../siteImages/grunge_banner.png'
import {Nav, Navbar, Image, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {listMessages} from '../actions/dailyMessageActions'
import DailyMessage from '../Components/DailyMessage'

const Header = () => {

    const dispatch = useDispatch()
    const newMessage = useSelector(state => state.dailyMessages)
    const {loading, error, dailyMessages} = newMessage

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
                <Link to='/'></Link><Nav.Link className="nav-text" href="/" class="navItem">Book an Appointment</Nav.Link>
                <Link to='gallery'></Link><Nav.Link className="nav-text" href="/gallery" class="navItem">Gallery</Nav.Link>
                <Link to='/contact'></Link><Nav.Link className="nav-text" href="/contact" class="navItem">Contact Me</Nav.Link>
                <Link to='/login'></Link><Nav.Link className="nav-text" href="/login" class="navItem">Account</Nav.Link>
            </Nav>
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
