// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import {Row, Col, Button} from 'reactstrap'

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header'

// ** Demo Components
import FileUploaderSingle from '../../form-elements/FileUploaderSingle'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'
import FileUploaderMultiple from "../../form-elements/FileUploaderMultiple";
import {ArrowLeft, ArrowRight} from "react-feather";

const DiagramAlirProsesProduksiForm = ({stepper, setCheckpoint}) => {
    return (
        <Fragment>
            <ExtensionsHeader
                title='Diagram Alir Proses Produksi Form'
                // link='https://github.com/react-dropzone/react-dropzone'
                subTitle="Tarik dan lepas atau upload langsung dengan klik tombol ini"
            />
            <Row>
                <Col sm='12'>
                    <FileUploaderMultiple />
                </Col>
            </Row>
            <div className='d-flex justify-content-center'>
                <Button className='me-1 ms-1' color='primary' onClick={() => {
                    stepper.previous()
                    setCheckpoint(0)
                }} outline>
                    <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                </Button>
                <Button className='me-1' color='primary' onClick={()=>{
                    stepper.next()
                    setCheckpoint(2)
                }}>
                    <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </div>
        </Fragment>
    )
}

export default DiagramAlirProsesProduksiForm
