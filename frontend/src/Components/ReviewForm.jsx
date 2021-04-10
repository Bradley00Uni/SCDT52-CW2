import React, { useState, useEffect } from 'react'
import { Container, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const ReviewForm = ({}) => {

    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()
    return (
        <></>
    )

}

export default ReviewForm