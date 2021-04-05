import React from 'react'

import banner from '../siteImages/grunge_banner.png'
import {Nav, Navbar, Image, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
        <Row className="row-management">
            <Image className="row-management" src={banner} />
        </Row>
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto align-nav">
                <Link to='/'></Link> <Nav.Link className="nav-text" href="/" class="navItem">Home</Nav.Link>
                <Link to='/reviews'></Link><Nav.Link className="nav-text" href="/reviews" class="navItem">Testimonials</Nav.Link>
                <Link to='/'></Link><Nav.Link className="nav-text" href="/" class="navItem">Book an Appointment</Nav.Link>
                <Link to='gallery'></Link><Nav.Link className="nav-text" href="/gallery" class="navItem">Gallery</Nav.Link>
                <Link to='/'></Link><Nav.Link className="nav-text" href="/" class="navItem">Contact Us</Nav.Link>
                <Link to='/'></Link><Nav.Link className="nav-text" href="/" class="navItem">Account</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default Header
