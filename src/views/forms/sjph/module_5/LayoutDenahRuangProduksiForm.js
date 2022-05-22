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

const LayoutDenahRuangProduksiForm = () => {
    return (
        <Fragment>
            <ExtensionsHeader
                title='Layout Denah Ruang Produksi'
                link='https://github.com/react-dropzone/react-dropzone'
                subTitle="Tarik dan lepas atau upload langsung dengan klik tombol ini"
            />
            <Row>
                <Col sm='12'>
                    <FileUploaderSingle />
                </Col>
            </Row>
        </Fragment>
    )
}

export default LayoutDenahRuangProduksiForm