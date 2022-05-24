import {Card, CardHeader, CardBody, CardTitle, CardText, Progress} from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";

const CompanyProfilePage = () => {

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle> Form SJPH:  {sessionStorage.nama_sjph} </CardTitle>
          </CardHeader>
          <CardBody>
              <CompanyForm />
          </CardBody>
        </Card>
      </div>
    )
}

export default CompanyProfilePage
