import {Card, CardHeader, CardBody, CardTitle, CardText, Progress, Row, Col} from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";
import {useEffect, useState} from "react";

const CompanyProfilePage = () => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 16) {
                    return 16;
                }
                const diff = 15;
                return Math.min(oldProgress + diff, 16);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
      <div>
          <Progress striped animated value={progress} />
        <Card>
          <CardHeader>
            <CardTitle> Perjalanan SJPH:  {sessionStorage.nama_sjph} </CardTitle>
          </CardHeader>
          <CardBody>
              <h4>Destinasi Pertama</h4>
              <Row>
                  <Col>
                      Kamu telah memulai perjalananmu di pagi hari,
                      namun kamu lupa untuk makan sarapan-mu.
                  </Col>
              </Row>
              Kamu pergi ke suatu tempat makan dan mencoba untuk memesan makanan tetapi kamu harus menjadi anggota terlebih dahulu.
              <CompanyForm />
          </CardBody>
        </Card>
      </div>
    )
}

export default CompanyProfilePage
