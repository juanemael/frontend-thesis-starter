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
import {ArrowRight} from "react-feather";

const LayoutDenahRuangProduksiForm = ({stepper,setCheckpoint}) => {

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
                <Button className='me-1' color='primary' onClick={()=>{
                    stepper.next()
                    setCheckpoint(1)
                }}>
                    <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                    <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                </Button>
            </div>
        </Fragment>
    )
}

export default LayoutDenahRuangProduksiForm
