import React from 'react'
import { Container, Col, Row, Card, Tabs, Tab, ListGroup, ListGroupItem, CardGroup, Nav } from 'react-bootstrap'

//DISPLAY CONTACT INFORMATION OF KAYE
const ContactInformation = () => {

    return (
        <Row id='contact-row'>
            <Col sm={12} md={4} lg={4}>
                <Card>
                    <Card.Header>
                        <strong>&#128222; Phone Number</strong>
                    </Card.Header>
                    <Card.Body>
                        <i>Phone Number</i>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm={12} md={4} lg={4}>
                <Card>
                    <Card.Header>
                        <strong>&#128205; My Address</strong>
                    </Card.Header>
                    <Card.Body>
                        <i>Address</i>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm={12} md={4} lg={4}>
                <Card>
                    <Card.Header>
                        <strong>&#128231; Email</strong>
                    </Card.Header>
                    <Card.Body>
                        <i>Email Address</i>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

}

export default ContactInformation