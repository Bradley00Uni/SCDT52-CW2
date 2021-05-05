import React from 'react'
import { Container, Card } from 'react-bootstrap'

//FORMATTING FOR SERVICE DISPLAY ON LANDING AND APPOINTMENT PAGES
const Service = ({service}) => {

    return (
        <Container className='py-3'>
            <Card className = 'text-center zoom '>
                <Card.Img variant='top' src={service.imageURL} />
                <Card.Body>
                    <Card.Text>
                        <h5 className='service-service'><strong>{service.service}</strong></h5>
                        <p className = 'service-details'>£{service.price} | {service.duration} minutes</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )

}

export default Service