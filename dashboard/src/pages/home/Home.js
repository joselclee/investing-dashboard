import HomeCard from './components/Card';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <HomeCard />
        </Col>
        <Col span={12}>
          <HomeCard />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <HomeCard />
        </Col>
        <Col span={12}>
          <HomeCard />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <HomeCard />
        </Col>
        <Col span={12}>
          <HomeCard />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <HomeCard />
        </Col>
        <Col span={12}>
          <HomeCard />
        </Col>
      </Row>
    </div>
  )
}

export default Home