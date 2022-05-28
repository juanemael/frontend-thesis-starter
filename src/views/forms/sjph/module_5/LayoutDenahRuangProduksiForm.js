// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import {Row, Col, Button} from 'reactstrap'

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'
import FileUploaderMultiple from "../../form-elements/FileUploaderMultiple";
import {useNavigate} from "react-router-dom";

const LayoutDenahRuangProduksiForm = () => {

    const navigate = useNavigate()
    return (
        <Fragment>
            <ExtensionsHeader
                title='Layout Denah Ruang Produksi'
                // link='https://github.com/react-dropzone/react-dropzone'
                subTitle="Tarik dan lepas atau upload langsung dengan klik tombol ini"
            />
            <Row>
                <Col sm='12'>
                    <FileUploaderMultiple />
                </Col>
            </Row>
            <div className='d-flex justify-content-center'>
            <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/bahan_untuk_kepentingan_halal')} outline>
                Kembali
            </Button>
            </div>
        </Fragment>
    )
}

export default LayoutDenahRuangProduksiForm
