// ** Reactstrap Imports
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    Badge,
    Table,
    Col,
    Button,
    ModalHeader,
    ModalBody,
    Row, Label, Input, FormFeedback, Modal, Form
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment} from "react";
import CompanyProfileModels from "../../../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {ArrowLeft, ArrowRight, Check, Edit, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import classnames from "classnames";

const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
}

const KajiUlangManajemenTable = () => {

    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [komitmenManajemen, setKomitmenManajemen] = useState("")
    const [bahan, setBahan] = useState("")
    const [prosesProdukHalal, setProsesProdukHalal] = useState("")
    const [produk, setProduk] = useState("")
    const [pemantauanEvaluasi, setPemantauaanEvaluasi] = useState("")

    const [details, setDetails] = useState([
        {
            id: 1,
            nama_dan_merek: 'Tepung beras Rosebrand',
            jumlah: 'Tepung',
            waktu_pembelian: '09-11-2018'
        }
    ])


    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    // ** States
    const [show, setShow] = useState(false)

    // ** Hooks
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const onSubmitModal = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            return null
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    const submit = async () => {
        const body = {
            nama_perusahaan: namaPerusahaan,
        }
        try {
            const result = await companyProfileModel.createCompanyProfile(body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        navigate('/sjph/company_profile')
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
                <small className='text-muted'>Risalah Kaji Ulang Manajemen</small>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='EmailMulti'>
                            Komitmen dan Manajemen
                        </Label>
                        <Input
                            name='komitmenManajemen'
                            type='textarea'
                            id='komitmenManajemen'
                            placeholder='Komitmen dan Manajemen'
                            style={{ minHeight: '100px' }}
                            onChange={e => setKomitmenManajemen(e.target.value)}
                            defaultValue={ details.id && details.nama_dan_merek }
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
                        <Label className='form-label' for='EmailMulti'>
                            Komitmen dan Manajemen
                        </Label>
                        <Input
                            name='bahan'
                            type='textarea'
                            id='bahan'
                            placeholder='Bahan'
                            style={{ minHeight: '100px' }}
                            onChange={e => setBahan(e.target.value)}
                            defaultValue={ details.id && details.nama_dan_merek }
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
                        <Label className='form-label' for='EmailMulti'>
                            Proses dan Produk Halal
                        </Label>
                        <Input
                            name='prosesProdukHalal'
                            type='textarea'
                            id='prosesProdukHalal'
                            placeholder='Proses dan Produk Halal'
                            style={{ minHeight: '100px' }}
                            onChange={e => setProsesProdukHalal(e.target.value)}
                            defaultValue={ details.id && details.nama_dan_merek }
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
                        <Label className='form-label' for='EmailMulti'>
                            Produk
                        </Label>
                        <Input
                            name='produk'
                            type='textarea'
                            id='produk'
                            placeholder='Produk'
                            style={{ minHeight: '100px' }}
                            onChange={e => setProduk(e.target.value)}
                            defaultValue={ details.id && details.nama_dan_merek }
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
                        <Label className='form-label' for='EmailMulti'>
                            Pemantauan dan Evaluasi
                        </Label>
                        <Input
                            name='pemantauanEvaluasi'
                            type='textarea'
                            id='pemantauanEvaluasi'
                            placeholder='Pemantauan dan Evaluasi '
                            style={{ minHeight: '100px' }}
                            onChange={e => setPemantauaanEvaluasi(e.target.value)}
                            defaultValue={ details.id && details.nama_dan_merek }
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
                    <Col sm='12'>
                        <div className='d-flex justify-content-center'>
                            <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/kepentingan_produksi_dan_distribusi_produk')} outline>
                                Kembali
                            </Button>
                            <Button className='me-1' color='primary' onClick={()=> setShow(true)}>
                                Tambah
                            </Button>
                            <Button className='me-1' color='primary' onClick={(e)=> e.preventDefault()}>
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
