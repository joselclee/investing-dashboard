import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Var = () => {
  return (
    <Container fluid>
        <Header />
        <Footer />
    </Container>
  )
}

export default Var