import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'
import Review from '../Components/Review'

const ReviewScreen = () => {

    //added to handle states
    const [reviews, setReviews] = useState([])

    //call useEffect - runs on page load
    useEffect(()=>{
        console.log("--Fetched Reviews--")
        const FetchReviews = async () =>{
            const {data} = await axios.get('/api/reviews')
            setReviews(data)
        } 
        
        FetchReviews()

    }, [])

    return (
        <div>
            <h1 class="header-text">Leave a Review:</h1>
            <Row>
                <p class="temporary-padding">Form goes here</p>
            </Row>
            <h1 class="header-text">Latest Reviews</h1>
            <Row>
                {reviews.map(review => (
                 <Col sm={12} md={6} lg={4}>
                     <Review review={review} />
                 </Col>
                ))}
            </Row>
        </div>
    )
}

export default ReviewScreen
