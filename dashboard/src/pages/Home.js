import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Graph from '../components/Graph'

const Home = () => {
  return (
    <div>
        <Header />
        <Container className="full-height">
          <Row>
            <Col>
              <Graph />
            </Col>
          </Row>
        </Container>
        <Footer />
    </div>
  )
}

export default Home