// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    ModalHeader,
    ModalBody, Modal
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useState, Fragment} from "react";
import KriteriaSJPHKebijakanHalalModels from "../../../../models/KriteriaSJPHKebijakanHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import { selectThemeColors } from '@utils'

const KriteriaSistemJaminanProdukHalalForm = () => {

    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState(new Date())


    const kriteriaSJPHKebijakanHalalModel = new KriteriaSJPHKebijakanHalalModels()

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const getNamaPerusahaan = async () =>{

    }

    const submit = async () => {
        const body = {
            nama_perusahaan: namaPerusahaan,
            tempat_persetujuan: tempatPersetujuan,
            tanggal_persetujuan: tanggalPersetujuan
        }
        try {
            const result = await kriteriaSJPHKebijakanHalalModel.createKebijakanHalal(body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        navigate('/sjph/kriteria_sistem_jaminan_produk_halal')
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
            <div className='content-header'>
                <h3 className='mb-0'>Halaman 1</h3>
                <small className='text-muted'>Cari tahu tentang kebijakan halal</small>
            </div>
                <Form>
                    <Row>
                        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                            <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                            <ModalBody className='px-sm-5 mx-50 pb-5'>
                                <div className='text-center mb-2'>
                                    <h1 className='mb-1'>Tambah Data Tabel</h1>
                                    <p> KEBIJAKAN HALAL <br/>
                                        [NAMA PERUSAHAAN]<br/>
                                        Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal
                                        secara konsisten dan berkesinambungan dengan melakukan tindakan: <br/>
                                        1.	Mematuhi peraturan perundangan terkait jaminan produk halal <br/>
                                        2.	Menggunakan bahan halal dan melaksanakan proses produk halal (PPH)<br/>
                                        3.	Menyiapkan sumber daya manusia yang mendukung pelaksanaan PPH di perusahaan<br/>
                                        4.	Mensosialisasikan dan mengkomunikasikan kebijakan halal pada seluruh
                                        pihak terkait untuk memastikan semua personel menjaga integritas halal di perusahaan.<br/>

                                        …................, .........................................<br/>
                                        Pimpinan Perusahaan,<br/>

                                        ( ........................................................)
                                    </p>
                                </div>
                                <Row className='gy-1 pt-75' >
                                    <Col xs={12} className='text-center mt-2 pt-50'>
                                        <Button color='secondary' outline onClick={() => setShow(false)}>
                                            Tutup
                                        </Button>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                    <Col md='6' sm='6' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Surat Kebijakan Halal
                        </Label>
                    </Col>
                    </Row>
                    <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Button color='primary' onClick={() => setShow(true)}>Kebijakan Halal</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='nameMulti'>
                                Nama Perusahaan
                            </Label>
                            <Input type='text' name='namaPerusahaan' id='namaPerusahaan' onChange={(e)=>{
                                setNamaPerusahaan(e.target.value)
                            }} placeholder='Nama Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='lastNameMulti'>
                                Tempat Persetujuan
                            </Label>
                            <Input type='text' name='nib' id='nib' onChange={(e)=>{
                                setTempatPersetujuan(e.target.value)
                            }} placeholder='Tempat Persetujuan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='hf-picker'>
                                Tanggal Persetujuan
                            </Label>
                            {/*<Input type='text' name='nib' id='nib' onChange={(e)=>{*/}
                            {/*    setTanggalPersetujuan(e.target.value)*/}
                            {/*}} placeholder='Nomor Induk Berusaha' />*/}
                            <Flatpickr
                                value={tanggalPersetujuan}
                                id='hf-picker'
                                className='form-control'
                                onChange={date => setTanggalPersetujuan(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    dateFormat: 'Y-m-d'
                                }}
                            />
                        </Col>
                        <Col sm='12'>
                            <div className='d-flex justify-content-end'>
                                <Button className='me-1' color='primary' onClick={submit}>
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
        </Fragment>
    )

}
export default KriteriaSistemJaminanProdukHalalForm
