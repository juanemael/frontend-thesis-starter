import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFConverter from "./PDFConverter";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";


const PDFRenderer = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle> SJPH-Ku </CardTitle>
            </CardHeader>
            <CardBody>
                <Row className='vh-100 d-flex flex column'>
                    <Col md='12' sm='12' className='mb-1'>
                        <PDFViewer className='col-md-12 h-100'>
                            <PDFConverter />
                        </PDFViewer>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        )
}

export default PDFRenderer
