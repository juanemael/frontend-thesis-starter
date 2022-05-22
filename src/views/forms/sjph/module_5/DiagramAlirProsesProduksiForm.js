// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header'

// ** Demo Components
import FileUploaderSingle from '../../form-elements/FileUploaderSingle'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'
import FileUploaderMultiple from "../../form-elements/FileUploaderMultiple";

const DiagramAlirProsesProduksiForm = () => {
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
        </Fragment>
    )
}

export default DiagramAlirProsesProduksiForm
