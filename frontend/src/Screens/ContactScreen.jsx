import React, {useState, useEffect} from 'react'
import { Image, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'

import Loader from '../Components/Loader'
import ErrorMessage from '../Components/ErrorMessage'

import OpeningTimes from '../Components/OpeningTimes'
import ContactBox from '../Components/ContactBox'

const ContactScreen = () => {

    return(
        <div>
            <h1 class="header-text">Get in Contact</h1>

            <Row>
                <Col sm={12} md={4} lg={3}>
                    <a href='https://www.facebook.com/westlakebarbershop/'>
                        <Image className='social-logo col-lg-8' src='images/social/facebook-logo.png' />
                        <h4 className="social-text">Kaye_the_barber</h4>
                    </a>
                </Col>
                <Col sm={12} md={4} lg={6}>
                    <ContactBox />
                </Col>
                <Col sm={12} md={4} lg={3}>
                    <a href="https://www.instagram.com/kaye_the_barber/">
                        <Image className='social-logo col-lg-8' src='images/social/instagram-logo.png' />
                        <h4 className="social-text">@kaye_the_barber</h4>
                    </a>
                </Col>
            </Row>

            <Row>
                <hr class="section-divide col-md-12"/>
            </Row>


            <Row>
                <Col sm={12} md={12} lg={12}>
                    <h1 class="header-text">When I'm Open</h1>
                </Col>
            </Row>
            <Row id='openingTimes'>
                <Col sm={12} md={12} lg={12}>
                    <OpeningTimes />
                </Col>
            </Row>

            <Row>
                <hr class="section-divide col-md-12"/>
            </Row>

            <Row>
                <Col sm={12} md={12} lg={12}>
                    <h1 class="header-text">Where to Find Me</h1>
                </Col>
            </Row>           
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1790.065483672197!2d-3.104861451249784!3d51.02177457054991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486df58be23eec63%3A0xd65cacff30cedba2!2sWestlake%20Barbers!5e0!3m2!1sen!2suk!4v1617824302406!5m2!1sen!2suk" width="800" height="650"  allowfullscreen="" loading="lazy"></iframe>
                </Col>
            </Row>
            
        </div>
    )
}

export default ContactScreen