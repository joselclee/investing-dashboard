import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
        <Header />
        <p>
            This dashboard was created by <a href="https://www.andrelee.engineer/">Jose Lee</a>, to help visualize and optimize a portfolio.
        </p>
        <Footer />
    </div>
  )
}

export default About