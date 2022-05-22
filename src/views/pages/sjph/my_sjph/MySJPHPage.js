import {Card, CardHeader, CardBody, CardTitle, CardText, Progress} from 'reactstrap'
import MySJPHTable from "../../../tables/sjph/my_sjph/MySJPHTable";

const MySJPHPage = () => {

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle> SJPH-Ku </CardTitle>
          </CardHeader>
          <CardBody>
              <MySJPHTable />
          </CardBody>
        </Card>
      </div>
    )
}

export default MySJPHPage
