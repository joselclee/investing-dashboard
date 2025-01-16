import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { Container, Row, Col } from 'react-bootstrap' 

const Optimize = () => {
  return (
    <div>
        <Header />
        <Container>
            <Row>
                <Col />
                <Col />
                <Col>
                <div className="sliders-text">
                    Portfolio Value
                </div>
                </Col>
            </Row>
        </Container>
        <Footer />    
    </div>
        
  )
}

export default Optimize