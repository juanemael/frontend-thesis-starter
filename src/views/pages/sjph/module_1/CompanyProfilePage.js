import {Card, CardHeader, CardBody, CardTitle, CardText, Progress} from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";

const CompanyProfilePage = () => {

    return (
      <div>
        <Card>
          <CardHeader>
            {/*<CardTitle> Form SJPH 🙌 </CardTitle>*/}
            <CardTitle> Form SJPH </CardTitle>
          </CardHeader>
          <CardBody>
              <CompanyForm />
          </CardBody>
        </Card>
      </div>
    )
}

export default CompanyProfilePage
