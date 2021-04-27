import React from 'react'
import { Container, Card } from 'react-bootstrap'

const GalleryImage = ({exampleCut}) => {

    if(exampleCut.uploadDate){
        var dateString = exampleCut.uploadDate.toString()
    }
    else if(exampleCut.createdAt){
        var dateString = exampleCut.createdAt.toString()
    }
    var dateFormat = dateString.substring(0,10)
    

    return (
        <Container className="py-3">
            <Card className="text-center">
              <Card.Img variant="top" src={exampleCut.imageURL} />
              <Card.Body>
                  <Card.Text>
                      <h5 className='gallery-caption'><strong>{exampleCut.description}</strong></h5>
                      <p className='gallery-date'>Uploaded: {dateFormat}</p>
                  </Card.Text>
              </Card.Body>
            </Card>
        </Container>
    )
}

export default GalleryImage
