import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import PDFConverter from "./PDFConverter";


const PDFRenderer = () => {
    return (
        <PDFViewer width="1920" height="1080">
            <PDFConverter />
        </PDFViewer>
        )
}

export default PDFRenderer
