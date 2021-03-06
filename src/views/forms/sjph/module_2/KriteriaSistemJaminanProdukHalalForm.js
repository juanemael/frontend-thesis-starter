// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    ModalHeader,
    ModalBody, Modal, Alert
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useState, Fragment, useEffect} from "react";
import KriteriaSJPHKebijakanHalalModels from "../../../../models/KriteriaSJPHKebijakanHalal";
import CompanyProfileModels from "../../../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import { selectThemeColors } from '@utils'
import {ArrowLeft, ArrowRight} from "react-feather";
import ModalPic from '@src/assets/images/sjph/contoh_persetujuan.png';

const KriteriaSistemJaminanProdukHalalForm = ({ stepper, setCheckpoint }) => {

    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState(new Date())
    const [detailCompany, setDetailCompany] = useState([])
    const [detailKebijakan, setDetailKebijakan] = useState([])
    const [modalShow, setModalShow] = useState(true)


    const kriteriaSJPHKebijakanHalalModel = new KriteriaSJPHKebijakanHalalModels()
    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const getCompanyProfile = async (id) => {
        try {
            if (!sessionStorage.perusahaan_id || sessionStorage.perusahaan_id === 'null') {
                console.log("NO DATA FOUND")

            } else {
                console.log("TEST ID",id)
                const result = await companyProfileModel.getById(id)
                setDetailCompany(result)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const getKeteranganKriteria = async (id) => {
        try {
            if (!sessionStorage.sjph_id || sessionStorage.sjph_id === 'null') {
                console.log("NO DATA FOUND")
            } else {
                const result = await kriteriaSJPHKebijakanHalalModel.getKeteranganKriteria(id)
                setDetailKebijakan(result)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        if (sessionStorage.perusahaan_id) {
            if (sessionStorage.perusahaan_id !== "" || sessionStorage.perusahaan_id !==null) {
                getCompanyProfile(sessionStorage.perusahaan_id)
                getKeteranganKriteria(sessionStorage.sjph_id)
            }
        } else {
            setNamaPerusahaan("")
        }
    },[])

    const submit = async () => {
        const body = {
            tempat_persetujuan_kebijakan_halal: tempatPersetujuan,
            tanggal_persetujuan_kebijakan_halal: tanggalPersetujuan
        }
        try {
            const result = await kriteriaSJPHKebijakanHalalModel.createKebijakanHalal(sessionStorage.sjph_id,body)
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
            <Modal isOpen={modalShow} toggle={() => setModalShow(!modalShow)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => {
                    setModalShow(!modalShow)
                }}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1' id={"headerInitialTitle"}>Selamat datang di destinasi kedua-mu</h1>
                        {/*<Alert color='info'>*/}
                        {/*    <h4 className='alert-heading'>Info</h4>*/}
                        {/*    <div className='alert-body'>*/}
                        {/*        Tootsie roll lollipop lollipop icing. Wafer cookie danish macaroon. Liquorice fruitcake apple pie I love*/}
                        {/*        cupcake cupcake.*/}
                        {/*    </div>*/}
                        {/*</Alert>*/}
                        {/*<p>Mulai dari sini, kamu akan berjalan melalui berbagai tempat wisata di setiap destinasi.</p>*/}
                        {/*<p>Setiap tempat wisata mempunyai isi yang berbeda beda jadi jangan sampai salah ya</p>*/}
                        <p>Mulai dari sini kamu akan menemukan tanggal dan tempat persetujuan.</p>
                        <p>Sebagai gambaran, tempat dan tanggal persetujuan akan ditulis sebagai contoh berikut.</p>
                        <Row sm={8} className='justify-content-center' style={{paddingBottom: 20}}>
                            <img className='company-pic' src={ModalPic} alt='company' style={{height: "inherit", width: "inherit"}} />
                        </Row>
                    </div>
                    <Row tag='form' className='gy-1 pt-75'>
                        <Col xs={12} className='text-center mt-2 pt-50' style={{display:'flex', justifyContent: 'center'}}>
                            <Button onClick={()=>{
                                setModalShow(false)
                            }} color='warning' id={'belumPernahButton'} >
                                Baik, aku mengerti!
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <div className='content-header'>
                <h3 className='mb-0'>Wisata 1</h3>
                <small className='text-muted'>Cari tahu tentang kebijakan halal</small>
            </div>
                <Form>
                    <Row>
                        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                            <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                            <ModalBody className='px-sm-5 mx-50 pb-5'>
                                <div className='text-center mb-2'>
                                    <p> KEBIJAKAN HALAL <br/>
                                        [NAMA PERUSAHAAN]<br/>
                                        Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal
                                        secara konsisten dan berkesinambungan dengan melakukan tindakan: <br/>
                                        1.	Mematuhi peraturan perundangan terkait jaminan produk halal <br/>
                                        2.	Menggunakan bahan halal dan melaksanakan proses produk halal (PPH)<br/>
                                        3.	Menyiapkan sumber daya manusia yang mendukung pelaksanaan PPH di perusahaan<br/>
                                        4.	Mensosialisasikan dan mengkomunikasikan kebijakan halal pada seluruh
                                        pihak terkait untuk memastikan semua personel menjaga integritas halal di perusahaan.<br/>

                                        [TEMPAT PERSETUJUAN], [TANGGAL PERSETUJUAN]<br/>
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
                            Contoh Jadi Surat Kebijakan Halal
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
                            <Input type='text' disabled name='namaPerusahaan' defaultValue={detailCompany.id && detailCompany.nama_perusahaan} id='namaPerusahaan' onChange={(e)=>{
                                setNamaPerusahaan(e.target.value)
                            }} placeholder='Nama Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='lastNameMulti'>
                                Tempat Persetujuan
                            </Label>
                            <Input type='text' name='nib' id='nib' defaultValue={detailKebijakan.tempat_persetujuan} onChange={(e)=>{
                                setTempatPersetujuan(e.target.value)
                            }} placeholder='Contoh: Jakarta' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='hf-picker'>
                                Tanggal Persetujuan
                            </Label>
                            {/*<Input type='text' name='nib' id='nib' onChange={(e)=>{*/}
                            {/*    setTanggalPersetujuan(e.target.value)*/}
                            {/*}} placeholder='Nomor Induk Berusaha' />*/}
                            <Flatpickr
                                value={detailKebijakan.tanggal_persetujuan ? detailKebijakan.tanggal_persetujuan : tanggalPersetujuan}
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
                            <div className='d-flex justify-content-center'>
                                <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/informasi_umum_perusahaan')} outline>
                                    <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                    <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                                </Button>
                                <Button className='me-1' color='success' onClick={submit}>
                                    Simpan
                                </Button>
                                <Button className='me-1' color='primary' onClick={()=>{
                                    stepper.next()
                                    setCheckpoint(1)
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
export default KriteriaSistemJaminanProdukHalalForm
