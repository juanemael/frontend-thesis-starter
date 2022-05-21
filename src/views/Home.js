import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Col, Row} from 'reactstrap'
import CardWelcome from "./ui-elements/cards/advance/CardWelcome";

const Home = () => {
  return (
    <div>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardWelcome />
        </Col>
      </Row>
      <Card>
        <CardHeader>
          <CardTitle>Selamata datang di thesis project Juan! 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Semoga thesis ini bisa berjalan mulus.</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
