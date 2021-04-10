import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'

import Image from '../Components/GalleryImage'
import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

import {useDispatch, useSelector} from 'react-redux'
import {listGallery} from '../actions/galleryActions'

const GalleryScreen = () => {

    const dispatch = useDispatch()
    const galleryList = useSelector(state => state.galleryList) 
    const {loading,error, exampleCuts} = galleryList


    //RUNS ON PAGE LOAD
    useEffect(()=>{
        dispatch(listGallery())
    }, [dispatch])

    return (
        <div>
            <h1 class="header-text">Photo Gallery</h1>
            {loading ? (<Loader />) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                <Row>
                    {exampleCuts.map(exampleCut => (
                    <Col sm={12} md={6} lg={4}>
                        <Image exampleCut={exampleCut} />
                    </Col>
                    ))}
                </Row>
            )}
        </div>
    )
}

export default GalleryScreen
