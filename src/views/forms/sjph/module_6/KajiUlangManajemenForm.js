// ** Reactstrap Imports
import {
    Col,
    Button,
    Row, Label, Input, Form
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment, useEffect} from "react";
import AuditKajiUlangManajemenModels from "../../../../models/AuditKajiUlangManajemen";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import classnames from "classnames";
import Flatpickr from "react-flatpickr";

const KajiUlangManajemenTable = () => {
    const [komitmenManajemen, setKomitmenManajemen] = useState("")
    const [bahan, setBahan] = useState("")
    const [prosesProdukHalal, setProsesProdukHalal] = useState("")
    const [pemantauanEvaluasi, setPemantauanEvaluasi] = useState("")
    const [produk, setProduk] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [showAlert, setShowAlert] = useState(false)


    const [details, setDetails] = useState([])


    const auditKajiUlangManajemenModel = new AuditKajiUlangManajemenModels()

    const navigate = useNavigate()

    // ** States
    const [show, setShow] = useState(false)

    const getKajiUlangManajemenID = async (id) => {
        try {
            if (!sessionStorage.kaji_ulang_manajemen_id || sessionStorage.kaji_ulang_manajemen_id === 'null') {
                setShowAlert(true)
                console.log("ALERT",showAlert)
            } else {
                const result = await auditKajiUlangManajemenModel.getKajiUlangManajemenByID(id)
                setDetails(result)
                console.log(details)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const submit = async () => {
        const body = {
            komitmen_dan_manajemen: komitmenManajemen,
            bahan,
            proses_produk_halal: prosesProdukHalal,
            produk,
            pemantauan_dan_evaluasi: pemantauanEvaluasi,
            tempat_persetujuan: tempatPersetujuan,
            tanggal_persetujuan: tanggalPersetujuan
        }
        try {
            const result = await auditKajiUlangManajemenModel.createKajiUlangManajemen(sessionStorage.sjph_id,body)
            if ((result.kaji_ulang_manajemen_id)||(result.success)) {
                sessionStorage.kaji_ulang_manajemen_id = result.kaji_ulang_manajemen_id
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getKajiUlangManajemenID(sessionStorage.kaji_ulang_manajemen_id)
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
        getKajiUlangManajemenID(sessionStorage.kaji_ulang_manajemen_id)
    },[])

    return (
        <Fragment>
            <div className='content-header'>
                <h3 className='mb-0'>Wisata 1</h3>
                <small className='text-muted'>Risalah Kaji Ulang Manajemen</small>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <h5>Materi:</h5>
                        <Label className='form-label' for='EmailMulti'>
                            Komitmen dan Manajemen
                        </Label>
                        <h5>Hasil Pembahasan:</h5>
                        <Input
                            name='komitmenManajemen'
                            type='textarea'
                            id='komitmenManajemen'
                            placeholder='Komitmen dan Manajemen'
                            style={{ minHeight: '100px' }}
                            onChange={e => setKomitmenManajemen(e.target.value)}
                            defaultValue={ details.id && details.komitmen_dan_manajemen }
                            className={classnames({ 'text-danger': komitmenManajemen.length > 120 })}
                        />
                        <span
                            className={classnames('textarea-counter-value float-end', {
                                'bg-danger': komitmenManajemen.length > 120
                            })}
                        >
                            {`${komitmenManajemen.length}/120`}
                        </span>
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <h5>Materi:</h5>
                        <Label className='form-label' for='EmailMulti'>
                            Bahan
                        </Label>
                        <h5>Hasil Pembahasan:</h5>
                        <Input
                            name='bahan'
                            type='textarea'
                            id='bahan'
                            placeholder='Bahan'
                            style={{ minHeight: '100px' }}
                            onChange={e => setBahan(e.target.value)}
                            defaultValue={ details.id && details.bahan }
                            className={classnames({ 'text-danger': bahan.length > 120 })}
                        />
                        <span
                            className={classnames('textarea-counter-value float-end', {
                                'bg-danger': bahan.length > 120
                            })}
                        >
                            {`${bahan.length}/120`}
                        </span>
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <h5>Materi:</h5>
                        <Label className='form-label' for='EmailMulti'>
                            Proses dan Produk Halal
                        </Label>
                        <h5>Hasil Pembahasan:</h5>
                        <Input
                            name='prosesProdukHalal'
                            type='textarea'
                            id='prosesProdukHalal'
                            placeholder='Proses dan Produk Halal'
                            value={details.proses_produk_halal}
                            style={{ minHeight: '100px' }}
                            onChange={e => setProsesProdukHalal(e.target.value)}
                            defaultValue={ details.id && details.proses_produk_halal }
                            className={classnames({ 'text-danger': prosesProdukHalal.length > 120 })}
                        />
                        <span
                            className={classnames('textarea-counter-value float-end', {
                                'bg-danger': prosesProdukHalal.length > 120
                            })}
                        >
                            {`${prosesProdukHalal.length}/120`}
                        </span>
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <h5>Materi:</h5>
                        <Label className='form-label' for='EmailMulti'>
                            Produk
                        </Label>
                        <h5>Hasil Pembahasan:</h5>
                        <Input
                            name='produk'
                            type='textarea'
                            id='produk'
                            placeholder='Produk'
                            style={{ minHeight: '100px' }}
                            onChange={e => setProduk(e.target.value)}
                            defaultValue={ details.id && details.produk }
                            className={classnames({ 'text-danger': produk.length > 120 })}
                        />
                        <span
                            className={classnames('textarea-counter-value float-end', {
                                'bg-danger': produk.length > 120
                            })}
                        >
                            {`${produk.length}/120`}
                        </span>
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <h5>Materi:</h5>
                        <Label className='form-label' for='EmailMulti'>
                            Pemantauan dan Evaluasi
                        </Label>
                        <h5>Hasil Pembahasan:</h5>
                        <Input
                            name='pemantauanEvaluasi'
                            type='textarea'
                            id='pemantauanEvaluasi'
                            placeholder='Pemantauan dan Evaluasi '
                            style={{ minHeight: '100px' }}
                            onChange={e => setPemantauanEvaluasi(e.target.value)}
                            defaultValue={ details.id && details.pemantauan_dan_evaluasi }
                            className={classnames({ 'text-danger': pemantauanEvaluasi.length > 120 })}
                        />
                        <span
                            className={classnames('textarea-counter-value float-end', {
                                'bg-danger': pemantauanEvaluasi.length > 120
                            })}
                        >
                            {`${pemantauanEvaluasi.length}/120`}
                        </span>
                    </Col>
                    <Col md={3} xs={6} className={'align-items-end'}>
                        <Label className='form-label' for='tanggal'>
                            Tanggal Persetujuan
                        </Label>
                        <Flatpickr
                            value={details.id && details.tanggal_persetujuan}
                            defaultValue={details.id && details.tanggal}
                            // defaultValue={cont}
                            id='tanggal'
                            className='form-control align-bottom'
                            style={{ minHeight: '100px' }}
                            onChange={date => setTanggalPersetujuan(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                            }}
                        />
                    </Col>
                    <Col md='3' sm='6' className='mb-1'>
                        <Label className='form-label' for='tempatPersetujuan'>
                            Tempat Persetujuan
                        </Label>
                        <Input type='text' defaultValue={details.id && details.tempat_persetujuan} name='tempatPersetujuan' id='tempatPersetujuan' onChange={(e)=>{
                            setTempatPersetujuan(e.target.value)
                        }} placeholder='Contoh: Jakarta' />
                    </Col>
                    <Col sm='12'>
                        <div className='d-flex justify-content-center'>
                            <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/kepentingan_produksi_dan_distribusi_produk')} outline>
                                Kembali
                            </Button>
                            <Button className='me-1' color='primary' onClick={submit}>
                                Tambah
                            </Button>
                            <Button className='me-1' color='primary' onClick={()=>navigate('/coming-soon')}>
                                Hasil Perjalanan
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )

}
export default KajiUlangManajemenTable
