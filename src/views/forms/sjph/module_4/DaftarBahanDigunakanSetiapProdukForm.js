// ** Reactstrap Imports
import {Row, Col, Input, Form, Button, Label, Card, CardHeader, Alert, CardBody} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment, useEffect} from "react";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import { selectThemeColors } from '@utils'
import makeAnimated from 'react-select/animated'
import {ArrowDown, ArrowLeft, ArrowRight} from "react-feather";
import Flatpickr from "react-flatpickr";
import SJPHKuModels from "../../../../models/SJPHKu";

const colorOptions = [
    { value: 1, label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 2, label: 'Blue', color: '#0052CC', isFixed: true },
    { value: 3, label: 'Purple', color: '#5243AA', isFixed: true },
    { value: 4, label: 'Red', color: '#FF5630', isFixed: false },
    { value: 5, label: 'Orange', color: '#FF8B00', isFixed: false },
    { value: 6, label: 'Yellow', color: '#FFC400', isFixed: false }
]

const DaftarBahanDigunakanSetiapProdukForm = ({stepper, getSJPHInfo, detailsSJPH, setCheckpoint}) => {

    const [tanggalDaftarBahanSetiapProduk, setTanggalDaftarBahanSetiapProduk] = useState("")
    const [tempatDaftarBahanSetiapProduk, setTempatDaftarBahanSetiapProduk] = useState("")
    const [namaProduk, setNamaProduk] = useState("")
    const [daftarBahan, setDaftarBahan] = useState([])
    const animatedComponents = makeAnimated()
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")

    const sjphKuModel = new SJPHKuModels()
    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()

    const navigate = useNavigate()

    const submit = async () => {
        console.log(daftarBahan)
        const daftar_bahan_id = daftarBahan.map((
            value => ({
                daftar_bahan_id: value,
            })
        ))
        console.log(daftar_bahan_id)
        const body = {
            daftar_bahan_id,
            nama_produk: namaProduk,
        }
        try {
            console.log(daftarBahan)
            const result = await bahanKepentinganHalalModel.createProduk(sessionStorage.sjph_id,body)
            if ((result.produk_bahan_id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        // navigate('/sjph/company_profile')
                        console.log(result)
                    })
            } else {
                await swal.fire('','Data gagal disimpan', 'error')
            }
        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }

    const submitTempatTanggal = async () => {
        const body = {
            tempat_persetujuan_daftar_bahan_setiap_produk: tempatPersetujuan? tempatPersetujuan : detailsSJPH.tempat_persetujuan_daftar_bahan_setiap_produk,
            tanggal_persetujuan_daftar_bahan_setiap_produk: tanggalPersetujuan? tanggalPersetujuan :  detailsSJPH.tanggal_persetujuan_daftar_bahan_setiap_produk
        }
        try {
            const result = await sjphKuModel.editTempatTanggalKeputusanSJPH(sessionStorage.sjph_id,body)
            if ((result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getSJPHInfo(sessionStorage.sjph_id)
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
                <h3 className='mb-0'>Halaman 2</h3>
                <small className='text-muted'>Daftar Bahan yang Digunakan Setiap Produk</small>
            </div>
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
                            <Label className='form-label' for='tanggalPersetujuan'>
                                Tempat Persetujuan
                            </Label>
                            <Input id='tanggalPersetujuan' defaultValue={detailsSJPH.sjph_id && detailsSJPH.tempat_persetujuan_daftar_bahan_setiap_produk} placeholder='Tempat Isi Persetujuan (Cth: Jakarta)'
                                   onChange={(e)=>{ setTempatPersetujuan(e.target.value) }}  />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tempatPersetujuan'>
                                Tanggal Persetujuan
                            </Label>
                            <Flatpickr
                                value={detailsSJPH.sjph_id && detailsSJPH.tanggal_persetujuan_daftar_bahan_setiap_produk}
                                id='tanggal'
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
                        <Col sm='12'>
                            <div className='d-flex justify-content-center'>
                                <Button onClick={submitTempatTanggal} className='me-1' color='primary'>
                                    Simpan
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <div className='divider divider-dashed'>
                <div className='divider-text'>Tabel Data <ArrowDown size={15} /></div>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Nama Produk
                        </Label>
                        <Input type='text' name='nama' id='nama' onChange={(e)=>{
                            setNamaProduk(
                                e.target.value)
                        }} placeholder='Nama Produk' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label'>Daftar Bahan</Label>
                        <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={[colorOptions[4], colorOptions[5]]}
                            isMulti
                            options={colorOptions}
                            className='react-select'
                            classNamePrefix='select'
                            onChange={(opt)=>{
                                opt.map(async (item) => {
                                    setDaftarBahan([...daftarBahan,item.value])
                                })
                            }}
                        />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Tempat Penetapan
                        </Label>
                        <Input type='text' name='jabatan' id='jabatan' onChange={(e)=>{
                            setTempatDaftarBahanSetiapProduk(e.target.value)
                        }} placeholder='Jabatan' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Tanggal Penetapan
                        </Label>
                        <Flatpickr
                            // value={tanggalSosialisasi}
                            // defaultValue={cont}
                            id='tanggal'
                            className='form-control'
                            onChange={date => setTanggalDaftarBahanSetiapProduk(date)}
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
                                setCheckpoint(0)
                            }} outline>
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                            </Button>
                            <Button className='me-1' color='primary' onClick={submit}>
                                Submit
                            </Button>
                            <Button className='me-1' color='primary' onClick={()=>{
                                stepper.next()
                                setCheckpoint(2)
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
export default DaftarBahanDigunakanSetiapProdukForm
