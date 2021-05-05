import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse, ProgressBar } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import Review from '../Components/Review'
import {listReviews, createReview} from '../actions/reviewActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
import ReviewFormContainer from '../Components/ReviewFormContainer'

const ReviewScreen = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')
    const [isAnon, setIsAnon] = useState('')

    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [formShow, setFormShow] = useState('')

    const createdReview = useSelector(state => state.createReview)
    const {createLoading, createError, review} = createdReview

    const reviewList = useSelector(state => state.reviewList)
    const {loading,error, reviews} = reviewList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const submitHandler = (e) => {
        e.preventDefault()

        if(!title || title.length < 1){
            setMessage('Please set a Title for the Review')
        }
        else if(!body || body.length < 1){
            setMessage('Please set a Body for the Review')
        }
        else if(!rating){
            setMessage('Please set a Rating for the Review')
        }
        else{
            console.log(title, body, rating, isAnon)
            dispatch(createReview(title, body, rating, isAnon))

            if(review){
                setMessage('')
                setSuccess('Review Submitted')
                dispatch(listReviews())
                setFormShow(false)
            }
        }
    }

    useEffect(()=>{
        dispatch(listReviews())
        setFormShow(true)
    }, [dispatch])

    return (
        <div>
            <h1 class="header-text">Latest Reviews</h1>
            {loading ? (<Loader />) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                <Row>
                    {reviews.slice(-6).reverse().map(review => (
                    <Col sm={12} md={6} lg={4}>
                        <Review review={review} />
                    </Col>
                    ))}
                </Row>
            )}
            <Row>
                <hr class="section-divide col-md-12" id="first-divide"/>
            </Row>

            {!userInfo || userInfo.length < 1 ?(
                <></>
            ):(
                <div>
                {createError && <ErrorMessage variant='danger'>{createError}</ErrorMessage> }
                {createLoading && <Loader />}
                {success && <ErrorMessage variant ='success'>{success}</ErrorMessage>}
                <ReviewFormContainer>
                <Collapse in={formShow}>
                    <Form onSubmit={submitHandler} className='review-form'>
                    <h1 className='text-center header-text'>Leave a Review</h1>
    
    
                    {message && <ErrorMessage variant ='danger'>{message}</ErrorMessage>}
    
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
                                <Button size='lg' className='rating-button' variant='outline-warning' onClick={()=>setRating(1)}>1</Button>
                                <Button size='lg' className='rating-button' variant='outline-warning' onClick={()=>setRating(2)}>2</Button>
                                <Button size='lg' className='rating-button' variant='outline-warning' onClick={()=>setRating(3)}>3</Button>
                                <Button size='lg' className='rating-button' variant='outline-warning' onClick={()=>setRating(4)}>4</Button>
                                <Button size='lg' className='rating-button' variant='outline-warning' onClick={()=>setRating(5)}>5</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={6} lg={8}>
                                <FormControl
                                as='textarea'
                                rows={2}
                                className='form-note-divide'
                                maxLength='100'
                                onChange={(e)=>setBody(e.target.value)}
                                placeholder='Please Summarise your experience (100 Character Max)' 
                                ></FormControl>
                            </Col>
    
                            <Col sm={6} md={4} lg={4} className='form-note-divide'>
                                <Button
                                onClick={() => setIsAnon(true)}
                                className='btn btn-block rounded' 
                                size='lg'
                                variant='outline-primary'
                                >Click to Leave Anonymously
                                </Button>   
                                
                            </Col>
                        </Row>
                        <Row className='bottom-button-row'>
                            <Col sm={6} md={12} lg={12} className='form-note-divide'>
                                <Button
                                onClick={submitHandler}
                                className='btn btn-block rounded btn-primary'
                                size='lg'
                                >Leave Review
                                </Button>   
                                
                            </Col>
                        </Row>
                    </Form>
                    </Collapse>
                    </ReviewFormContainer>
                 </div>
            )}
        </div>
    )
}

export default ReviewScreen
