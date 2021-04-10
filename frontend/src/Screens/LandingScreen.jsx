import React, {useEffect} from 'react'
import {Row, Col, Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import About from '../Components/About'
import Service from '../Components/Service'
import OpeningTimes from '../Components/OpeningTimes'
import ContactInformation from '../Components/ContactInformation'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

import {useDispatch, useSelector} from 'react-redux'
import {listServices} from '../actions/serviceActions'

const LandingScreen = () => {

    const dispatch = useDispatch()
    const serviceList = useSelector(state => state.serviceList) 
    const {loading,error, services} = serviceList

    //RUNS ON PAGE LOAD
    useEffect(()=>{
        dispatch(listServices()) //Only until service model imported
    }, [dispatch])

    return (
        <div>
            <h1 class="header-text">Welcome to my Website!</h1>
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <h2 class="header-text">About Me</h2>
                </Col>
            </Row>
            <Row className="message-row">
                <Col sm={12} md={12} lg={12}>
                    <About />
                </Col>
            </Row>       

            <Row>
                <hr class="section-divide col-md-12" id="first-divide"/>
            </Row>
            <h2 class="header-text">Popular Choices</h2>
            <Row>
            {loading ? (<Loader />) : error ? (<ErrorMessage variant="danger">{error}</ErrorMessage>) : (
                <Row>
                    {services.slice(3,7).map(service => (
                    <Col sm={12} md={4} lg={3}>
                        <Service service={service} />
                    </Col>
                    ))}
                </Row>
            )}
            </Row>
            <Row className="button-row">
                <Col sm={1} md={3} lg={1} />
                <Col sm={10} md={6} lg={5} className="align-items-center">
                    <Link to='/'><Button variant='outline-success' size='lg' block>Book an Appointment</Button></Link>
                </Col>
                <Col sm={10} md={6} lg={5} className="align-items-center">
                    <Link to='/gallery'><Button variant='outline-success' size='lg' block>More of my Cuts</Button></Link>
                </Col>
                <Col sm={1} md={3} lg={1} />
            </Row>

            <Row>
                <hr class="section-divide col-md-12" id="first-divide"/>
            </Row>

            <h2 class="header-text">Opening Times</h2>
            <Row id='openingTimes-row'>
                <Col sm={12} md={12} lg={12}>
                    <OpeningTimes />
                </Col>
            </Row>

            <ContactInformation />

            <Row className="button-row bottom-row">
                <Col sm={1} md={3} lg={3} />
                <Col sm={10} md={6} lg={6} className="align-items-center">
                    <Link to='/contact'><Button href='#top' variant='outline-success' size='lg' block>Get in Contact</Button></Link>
                </Col>
                <Col sm={1} md={3} lg={3} />
            </Row>
        </div>
    )
}

export default LandingScreen
