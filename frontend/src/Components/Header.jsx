import React from 'react'

import banner from '../images/grunge_banner.png'
import {Nav, Navbar, Image, Row} from 'react-bootstrap'

const Header = () => {
    return (
        <>
        <Row>
            <Image className="w-100" src={banner} />
        </Row>
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto align-nav">
                <Nav.Link className="nav-text" href="#home" class="navItem">Home</Nav.Link>
                <Nav.Link className="nav-text" href="#home" class="navItem">Testimonials</Nav.Link>
                <Nav.Link className="nav-text" href="#home" class="navItem">Book an Appointment</Nav.Link>
                <Nav.Link className="nav-text" href="#home" class="navItem">Gallery</Nav.Link>
                <Nav.Link className="nav-text" href="#home" class="navItem">Contact Us</Nav.Link>
                <Nav.Link className="nav-text" href="#home" class="navItem">Account</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    )
}

export default Header
