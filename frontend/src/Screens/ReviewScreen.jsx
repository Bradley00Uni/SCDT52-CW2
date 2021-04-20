import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import Review from '../Components/Review'
import {listReviews} from '../actions/reviewActions'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'
import ReviewForm from '../Components/ReviewForm'

const ReviewScreen = () => {

    const dispatch = useDispatch()
    const reviewList = useSelector(state => state.reviewList)
    const {loading,error, reviews} = reviewList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        dispatch(listReviews())
    }, [dispatch])

    return (
        <div>
            <h1 class="header-text">Latest Reviews</h1>
            {loading ? (<Loader />) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                <Row>
                    {reviews.slice((reviews.length)-6).reverse().map(review => (
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
                <ReviewForm />
            )}
        </div>
    )
}

export default ReviewScreen
