import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import CompanyForm from "./forms/CompanyForm";

const CompanyProfilePage = () => {
  return (
      <div>
        <Card>
          <CardHeader>
            {/*<CardTitle> Form SJPH 🙌 </CardTitle>*/}
            <CardTitle> Form SJPH </CardTitle>
          </CardHeader>
          <CardBody>
            {/*<CardText>This is your second page.</CardText>*/}
            {/*<CardText>*/}
            {/*  Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes.*/}
            {/*  Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.*/}
            {/*</CardText>*/}
              <CompanyForm />
          </CardBody>
        </Card>
      </div>
  )
}

export default CompanyProfilePage
