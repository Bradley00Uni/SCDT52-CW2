import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Review from '../Components/Review'
import {createReview} from '../actions/reviewActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
import ReviewFormContainer from './ReviewFormContainer'

const ReviewForm = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')
    const [isAnon, setIsAnon] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        console.log(title, body, rating, isAnon)
        dispatch(createReview(title, body, rating, isAnon))
    }

    return(
        <div>
            <ReviewFormContainer>
                <Form onSubmit={submitHandler} className='review-form'>
                <h1 className='text-center header-text'>Leave a Review</h1>
                    <Row>
                        <Col sm={6} md={6} lg={8}>
                            <FormControl
                            placeholder='Review Title'
                            maxLength='40'
                            size='lg'
                            onChange={(e)=>setTitle(e.target.value)}
                            ></FormControl>
                        </Col>
                        <Col sm={6} md={6} lg={4} className='button-toolbar text-right'>
                            <Button size='lg' className='btn-info rating-button' onClick={()=>setRating(1)}>1</Button>
                            <Button size='lg' className='btn-info rating-button' onClick={()=>setRating(2)}>2</Button>
                            <Button size='lg' className='btn-info rating-button' onClick={()=>setRating(3)}>3</Button>
                            <Button size='lg' className='btn-info rating-button' onClick={()=>setRating(4)}>4</Button>
                            <Button size='lg' className='btn-info rating-button' onClick={()=>setRating(5)}>5</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} md={12} lg={12}>
                            <FormControl
                            as='textarea'
                            rows={3}
                            className='form-note-divide'
                            maxLength='100'
                            onChange={(e)=>setBody(e.target.value)}
                            placeholder='Please Summarise your experience (100 Character Max)' 
                            ></FormControl>
                        </Col>
                    </Row>
                    <Row className='bottom-button-row'>
                        <Col sm={6} md={4} lg={4} className='form-note-divide'>
                            <Button
                            onClick={() => setIsAnon(true)}
                            className='btn btn-block rounded btn-info'
                            size='lg'
                            >Click to Leave Anonymously
                            </Button>   
                            
                        </Col>
                        <Col sm={6} md={8} lg={8} className='form-note-divide'>
                            <Button
                            onClick={submitHandler}
                            className='btn btn-block rounded btn-success'
                            size='lg'
                            >Leave Review
                            </Button>   
                            
                        </Col>
                    </Row>
                </Form>
                </ReviewFormContainer>
        </div>
    )
}

export default ReviewForm