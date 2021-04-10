import React from 'react'
import { Container, Card, Col, Row } from 'react-bootstrap'

import MessagePicture from './MessagePicture'

const About = () => {

    return(
        <Row>
            <Col sm={12} md={6} lg={6}>
            <p class="body-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet mauris at nulla dapibus, sed sollicitudin justo posuere. Ut at dolor enim. Ut leo nunc, rutrum id lacus in, tincidunt elementum lacus. Maecenas turpis est, laoreet sed mi eget, lacinia dictum ex. Morbi quis sollicitudin nulla, in ultricies justo. Maecenas condimentum at elit at laoreet. Praesent lobortis nunc vel quam commodo congue. Quisque blandit nunc et neque pretium mollis. Fusce dapibus ante consequat nisl rhoncus, eu aliquam dolor accumsan. Suspendisse libero eros, consequat eget faucibus nec, ultricies quis eros. Aliquam iaculis non mi eu commodo. Donec nec tristique ligula. Quisque ultrices ligula eu suscipit elementum. Donec suscipit ipsum eros, eu viverra ante tempus vitae. Mauris tellus est, sodales sit amet porta non, lacinia ut risus.
                <br></br><br></br>
                Vestibulum tellus lorem, egestas ac malesuada sed, laoreet eget magna. Suspendisse aliquam venenatis eros eu scelerisque. Phasellus ante lectus, molestie nec pharetra non, cursus nec felis. Sed ullamcorper, mauris vel dictum dapibus, ante velit aliquet purus, sit amet fermentum elit ipsum sed risus. In vestibulum ligula metus, non vehicula nunc venenatis a. 
            </p>
            </Col>
            <Col sm={0} md={6} lg={6}>
                <MessagePicture />
            </Col>
        </Row>
    )
}

export default About