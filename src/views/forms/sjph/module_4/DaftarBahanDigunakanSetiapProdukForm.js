// ** Reactstrap Imports
import { Row, Col, Input, Form, Button, Label } from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment} from "react";
import CompanyProfileModels from "../../../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import { selectThemeColors } from '@utils'
import makeAnimated from 'react-select/animated'

const colorOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isFixed: true },
    { value: 'purple', label: 'Purple', color: '#5243AA', isFixed: true },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: false },
    { value: 'orange', label: 'Orange', color: '#FF8B00', isFixed: false },
    { value: 'yellow', label: 'Yellow', color: '#FFC400', isFixed: false }
]

const DaftarBahanDigunakanSetiapProdukForm = () => {

    const [nama, setNama] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [ktp, setKTP] = useState("")
    const [perusahaan, setPerusahaan] = useState("")
    const animatedComponents = makeAnimated()

    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    const submit = async () => {
        const body = {
            nama,
            jabatan,
            ktp,
            perusahaan
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
                <h3 className='mb-0'>Halaman 2</h3>
                <small className='text-muted'>Daftar Bahan yang Digunakan Setiap Produk</small>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Nama Produk
                        </Label>
                        <Input type='text' name='nama' id='nama' onChange={(e)=>{
                            setNama(
                                e.target.value)
                        }} placeholder='Nama' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label'>Daftar Bahan</Label>
                        <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[colorOptions[4], colorOptions[5]]}
                            isMulti
                            options={colorOptions}
                            className='react-select'
                            classNamePrefix='select'
                        />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Tempat Penetapan
                        </Label>
                        <Input type='text' name='jabatan' id='jabatan' onChange={(e)=>{
                            setJabatan(e.target.value)
                        }} placeholder='Jabatan' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Tanggal
                        </Label>
                        <Input type='text' name='ktp' id='ktp' onChange={(e)=>{
                            setKTP(e.target.value)
                        }} placeholder='Nomor KTP' />
                    </Col>
                    <Col sm='12'>
                        <div className='d-flex justify-content-end'>
                            <Button className='me-1' color='primary' onClick={(e)=> e.preventDefault()}>
                                Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )

}
export default DaftarBahanDigunakanSetiapProdukForm
