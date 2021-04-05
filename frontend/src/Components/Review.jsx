import React from 'react'
import { Container, Card } from 'react-bootstrap'
import Star from './Star'

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
                        <p>{review.review}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{review.userId} - {review.createdAt}</Card.Footer>
            </Card>
        </Container>
    )
}

export default Review
