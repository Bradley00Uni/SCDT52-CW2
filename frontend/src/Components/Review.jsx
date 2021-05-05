import React from 'react'
import { Container, Card } from 'react-bootstrap'
import Star from './Star'

//FORMATTING OF REVIEWS OUTPUTTED TO TESTIMONIAL PAGES
const Review = ({review}) => {

    var blank = " "
    let items = []

    for (let i=0; i < review.rating; i++){
        items.push(<Star/>, blank )
    }

    return (
        <Container className="py-3">
            <Card className="text-center">
                <Card.Header>{items}</Card.Header>
                <Card.Body>
                    <Card.Title>{review.title}</Card.Title>
                    <Card.Text>
                        <p>{review.body}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted"><span className='review-client'>{review.client}</span> - {review.createdAt.slice(0,10)}</Card.Footer>
            </Card>
        </Container>
    )
}

export default Review
