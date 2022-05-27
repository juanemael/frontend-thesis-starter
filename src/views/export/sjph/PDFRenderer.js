import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFConverter from "./PDFConverter";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";


const PDFRenderer = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle> SJPH-Ku </CardTitle>
            </CardHeader>
            <CardBody>
                <PDFViewer width="1920" height="1080">
                    <PDFConverter />
                </PDFViewer>
            </CardBody>
        </Card>
        )
}

export default PDFRenderer
