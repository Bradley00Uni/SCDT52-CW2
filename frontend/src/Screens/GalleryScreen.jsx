import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'
import Image from '../Components/GalleryImage'

const GalleryScreen = () => {

    //added to handle states
    const [exampleCuts, setImages] = useState([])

    //call useEffect - runs on page load
    useEffect(()=>{
        console.log("--Fetched Gallery Images--")
        const FetchImages = async () =>{
            const {data} = await axios.get('/api/cuts')
            setImages(data)
        } 
        
        FetchImages()

    }, [])

    return (
        <div>
            <h1 class="header-text">Photo Gallery</h1>
            <Row>
                {exampleCuts.map(exampleCut => (
                 <Col sm={12} md={6} lg={4}>
                     <Image exampleCut={exampleCut} />
                 </Col>
                ))}
            </Row>
            
        </div>
    )
}

export default GalleryScreen
