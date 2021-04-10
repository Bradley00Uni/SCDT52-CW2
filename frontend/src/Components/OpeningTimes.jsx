import React from 'react'
import { Container, Card, ListGroup, ListGroupItem, CardGroup } from 'react-bootstrap'

const OpeningTimes = () => {

    return (
        <CardGroup className='opening-times'>
            <Card className='closed-card'><Card.Header>Monday</Card.Header><Card.Body className='closed'><Card.Text>Closed</Card.Text></Card.Body></Card>
            <Card><Card.Header>Tuesday</Card.Header><Card.Body><Card.Text>8am - 6pm</Card.Text></Card.Body></Card>
            <Card><Card.Header>Wednesday</Card.Header><Card.Body><Card.Text>8am - 6pm</Card.Text></Card.Body></Card>
            <Card><Card.Header>Thursday</Card.Header><Card.Body><Card.Text>8am - 6pm</Card.Text></Card.Body></Card>
            <Card><Card.Header>Friday</Card.Header><Card.Body><Card.Text>8am - 6pm</Card.Text></Card.Body></Card>
            <Card><Card.Header>Saturday</Card.Header><Card.Body><Card.Text>8am - 6pm</Card.Text></Card.Body></Card>
            <Card className='closed-card'><Card.Header>Sunday</Card.Header><Card.Body className='closed'><Card.Text>Closed</Card.Text></Card.Body></Card>
        </CardGroup>
    )

}

export default OpeningTimes