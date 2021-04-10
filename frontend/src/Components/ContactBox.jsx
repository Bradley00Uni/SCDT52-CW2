import React from 'react'
import { Container, Col, Row, Card, Tabs, Tab, ListGroup, ListGroupItem, CardGroup, Nav } from 'react-bootstrap'

const ContactBox = () => {

    return (
        <Card className='border-light mb-3'>
            <Card.Header><h3>My Contact Details</h3></Card.Header>
            <Card.Body>
                <h5>&#128222; Phone Number: <i>Phone Number</i></h5> <br />
                <h5>&#128231; Email Address: <i>Email Address</i></h5> <br />
                <h5>&#128205; Address: <i>Address so and so street</i></h5>
            </Card.Body>
        </Card>
    )

}

export default ContactBox