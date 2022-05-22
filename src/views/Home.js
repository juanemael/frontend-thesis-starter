import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Col, Row} from 'reactstrap'
import CardWelcome from "./ui-elements/cards/advance/CardWelcome";
import ProgressOverview from "./ui-elements/cards/analytics/ProgressOverview";
import { ThemeColors } from '@src/utility/context/ThemeColors'
import {useContext} from "react";

const Home = () => {
    const context = useContext(ThemeColors)
  return (
    <div>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardWelcome />
        </Col>
          <Col lg='6' sm='12'>
              <ProgressOverview success={context.colors.success.main} />
          </Col>
      </Row>
      <Card>
        <CardHeader>
          <CardTitle>Selamat datang di thesis project Juan! 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Semoga thesis ini bisa berjalan mulus.</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
