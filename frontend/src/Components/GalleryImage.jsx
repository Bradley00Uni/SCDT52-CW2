import React from 'react'
import { Container, Card } from 'react-bootstrap'

const GalleryImage = ({exampleCut}) => {

    return (
        <Container className="py-3">
            <Card className="text-center">
              <Card.Img variant="top" src={exampleCut.imageURL} />
              <Card.Body>
                  <Card.Text>
                      <p>{exampleCut.description}</p>
                      <p>Uploaded: {exampleCut.uploadDate}</p>
                  </Card.Text>
              </Card.Body>
            </Card>
        </Container>
    )
}

export default GalleryImage
