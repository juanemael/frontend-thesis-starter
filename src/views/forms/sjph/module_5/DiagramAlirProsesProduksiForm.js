// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** Reactstrap Imports
import {Row, Col, Button, Card, CardHeader, Alert, CardBody, Label, Input, CardImg, CardTitle} from 'reactstrap'

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header'

// ** Demo Components
import FileUploaderSingle from '../../form-elements/FileUploaderSingle'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'
import FileUploaderMultiple from "../../form-elements/FileUploaderMultiple";
import {ArrowDown, ArrowLeft, ArrowRight} from "react-feather";
import {useNavigate} from "react-router-dom";
import KepentinganProduksiDistribusiProdukModels from "../../../../models/KepentinganProduksiDistribusiProduk";
import swal from "sweetalert2";
import Flatpickr from "react-flatpickr";

const DiagramAlirProsesProduksiForm = ({stepper, setCheckpoint}) => {
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [details, setDetails] = useState([])

    const kepentinganProduksiDistribusiProdukModel = new KepentinganProduksiDistribusiProdukModels()


    const getDiagramAlirProsesProduksiBySJPHID = async (id) => {
        try {
            console.log("TESTESTES", sessionStorage.sjph_id)
            const result = await kepentinganProduksiDistribusiProdukModel.getDiagramAlirProsesProduksiBySJPHID(id)
            setDetails(result)
            console.log(details)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(()=>{
        setImageUrl(null)
        getDiagramAlirProsesProduksiBySJPHID(sessionStorage.sjph_id)
    },[])
    const upload = async ()=>{
        const body = {
            tanggal_persetujuan_diagram_alir_proses_produksi: tanggalPersetujuan? tanggalPersetujuan : details.tanggal_persetujuan_diagram_alir_proses_produksi,
            tempat_persetujuan_diagram_alir_proses_produksi: tempatPersetujuan? tempatPersetujuan : details.tempat_persetujuan_diagram_alir_proses_produksi,
            url: imageUrl ? imageUrl : details.url
        }
        try {
            const result = await kepentinganProduksiDistribusiProdukModel.createDiagramAlirProsesProduksiBySJPHID(sessionStorage.sjph_id,body)
            if ((result)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getDiagramAlirProsesProduksiBySJPHID(sessionStorage.sjph_id)
                    })
            } else {
                await swal.fire('','Data gagal disimpan', 'error')
            }
        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }
    return (
        <Fragment>
            <ExtensionsHeader
                title='Diagram Alir Proses Produksi'
                // link='https://github.com/react-dropzone/react-dropzone'
            />
            <Card>
                <CardHeader>
                    <div>
                        <h4>Isi Tempat Dan Tanggal Persetujuan</h4>
                        <Alert color='info'>
                            <div className='alert-body'>
                                Info: Kamu bisa mengganti tanggal dan tempat sesuai waktu dan tempat pengisian.
                            </div>
                        </Alert>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tempatlPersetujuan'>
                                Tempat Persetujuan
                            </Label>
                            <Input id='tempatPersetujuan' defaultValue={tempatPersetujuan? tempatPersetujuan : details.tempat_persetujuan_diagram_alir_proses_produksi} placeholder='Isi Kota untuk Tempat Persetujuan (Cth: Jakarta)'
                                   onChange={(e)=>{ setTempatPersetujuan(e.target.value) }}  />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tanggalPersetujuan'>
                                Tanggal Persetujuan
                            </Label>
                            <Flatpickr
                                value={tanggalPersetujuan? tanggalPersetujuan : details.tanggal_persetujuan_diagram_alir_proses_produksi}
                                id='tanggalPersetujuan'
                                className='form-control'
                                onChange={date => setTanggalPersetujuan(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    defaultDate: "today",
                                    dateFormat: 'Y-m-d',
                                }}
                            />
                        </Col>
                        &nbsp;
                    </Row>
                </CardBody>
            </Card>
            <div className='divider divider-dashed'>
                <div className='divider-text'>Upload File <ArrowDown size={15} /></div>
            </div>
            <Row>
                <Col sm='12'>
                    <FileUploaderSingle createFunc={upload} imageURL={imageUrl} setImageURL={setImageUrl} />
                </Col>
            </Row>
            <div className='divider divider-dashed'>
                <div className='divider-text'>Preview Gambar <ArrowDown size={15} /></div>
            </div>

            {
                // eslint-disable-next-line multiline-ternary
                imageUrl || details.url ?
                    (
                        <div className='d-flex justify-content-center'>
                            <Col lg='4' md='8'>
                                <Card>
                                    <CardImg top src={imageUrl ? imageUrl : details.url} alt='Card cap' />
                                    <CardBody>
                                        <CardTitle tag='h4'>Diagram Alir Proses Produksi</CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    ): null
            }

            <div className='d-flex justify-content-center'>
                <Button className='me-1 ms-1' color='primary' onClick={()=>navigate('/sjph/bahan_untuk_kepentingan_halal')} outline>
                    <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
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

export default DiagramAlirProsesProduksiForm
