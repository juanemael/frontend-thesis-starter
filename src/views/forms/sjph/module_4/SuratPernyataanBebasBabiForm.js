// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useState, Fragment, useEffect} from "react";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {ArrowLeft, ArrowRight} from "react-feather";
import Flatpickr from "react-flatpickr";
import '@styles/react/libs/flatpickr/flatpickr.scss'

const SuratPernyataanBebasBabiForm = ({stepper, setCheckpoint}) => {

    const [namaPemilikUsaha, setNamaPemilikUsaha] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [noKTP, setNoKTP] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [tempat, setTempat] = useState("")
    const [details, setDetails] = useState([])
    const [showAlert, setShowAlert] = useState(false)


    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()

    const navigate = useNavigate()

    const getSuratPernyataanBebasBabiID = async (id) => {
        try {
            if (!sessionStorage.surat_pernyataan_bebas_babi_id || sessionStorage.surat_pernyataan_bebas_babi_id === 'null') {
                setShowAlert(true)
                console.log("ALERT",showAlert)
            } else {
                const result = await bahanKepentinganHalalModel.getSuratPernyataanBebasBabiByID(id)
                setDetails(result)
                console.log(details)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const submit = async () => {
        const body = {
            no_ktp: noKTP,
            nama_pemilik_usaha: namaPemilikUsaha,
            jabatan,
            tanggal,
            tempat
        }
        try {
            const result = await bahanKepentinganHalalModel.createSuratPernyataanBebasBabi(sessionStorage.sjph_id,body)
            if ((result.surat_pernyataan_bebas_babi_id)||(result.success)) {
                sessionStorage.surat_pernyataan_bebas_babi_id = result.surat_pernyataan_bebas_babi_id
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getSuratPernyataanBebasBabiID(sessionStorage.surat_pernyataan_bebas_babi_id)
                    })
            } else {
                await swal.fire('','Data gagal disimpan', 'error')
            }
        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }


    useEffect(()=>{
        getSuratPernyataanBebasBabiID(sessionStorage.surat_pernyataan_bebas_babi_id)
    },[])

    return (
        <Fragment>
            <div className='content-header'>
                <h3 className='mb-0'>Halaman 5</h3>
                <small className='text-muted'>Surat Pernyataan Bebas Babi</small>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Nama
                        </Label>
                        <Input type='text' defaultValue={details.id && details.nama_pemilik_usaha} name='nama' id='nama' onChange={(e)=>{
                            setNamaPemilikUsaha(
                                e.target.value)
                        }} placeholder='Nama' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Jabatan
                        </Label>
                        <Input type='text' defaultValue={details.id && details.jabatan} name='jabatan' id='jabatan' onChange={(e)=>{
                            setJabatan(e.target.value)
                        }} placeholder='Jabatan' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            No. KTP
                        </Label>
                        <Input type='text' defaultValue={details.id && details.no_ktp} name='ktp' id='ktp' onChange={(e)=>{
                            setNoKTP(e.target.value)
                        }} placeholder='Nomor KTP' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Perusahaan
                        </Label>
                        <Input type='text' defaultValue={details.id && details.jabatan} name='perusahaan' id='perusahaan' onChange={(e)=>{
                            setJabatan(e.target.value)
                        }} placeholder='Perusahaan' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Tempat
                        </Label>
                        <Input type='text' defaultValue={details.id && details.tempat} name='perusahaan' id='perusahaan' onChange={(e)=>{
                            setTempat(e.target.value)
                        }} placeholder='Perusahaan' />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='tanggal'>
                            Tanggal
                        </Label>
                        <Flatpickr
                            value={details.id && details.tanggal}
                            // defaultValue={cont}
                            id='tanggal'
                            defaultValue={details.id && details.tanggal}
                            className='form-control'
                            onChange={date => setTanggal(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                            }}
                        />
                    </Col>
                    <Col sm='12'>
                        <div className='d-flex justify-content-center'>
                            <Button className='me-1 ms-1' color='primary' onClick={() => {
                                stepper.previous()
                                setCheckpoint(3)
                            }} outline>
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                            </Button>
                            <Button className='me-1' color='primary' onClick={submit}>
                                Submit
                            </Button>
                            <Button className='me-1' color='primary' onClick={()=>{
                                stepper.next()
                                setCheckpoint(5)
                            }}>
                                <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )

}
export default SuratPernyataanBebasBabiForm
