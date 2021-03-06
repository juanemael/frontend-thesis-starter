import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Col, Row, Button} from 'reactstrap'
import CardWelcome from "./ui-elements/cards/advance/CardWelcome";
import ProgressOverview from "./ui-elements/cards/analytics/ProgressOverview";
import { ThemeColors } from '@src/utility/context/ThemeColors'
import {useContext, useEffect} from "react";

const Home = () => {
    const context = useContext(ThemeColors)
  return (
    <div>
      <Row className='match-height'>
        <Col lg='12' sm='12'>
          <CardWelcome />
        </Col>
          {/*<Col lg='6' sm='12'>*/}
          {/*    <ProgressOverview success={context.colors.success.main} />*/}
          {/*</Col>*/}
      </Row>
      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle>Selamat datang di thesis project Juan! 🚀</CardTitle>*/}
      {/*  </CardHeader>*/}
      {/*  <CardBody>*/}
      {/*    <CardText>Klik disini untuk memulai perjalanan anda</CardText>*/}
      {/*  </CardBody>*/}
      {/*</Card>*/}
    </div>
  )
}

export default Home
