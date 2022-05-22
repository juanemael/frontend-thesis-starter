// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useState, Fragment} from "react";
import CompanyProfileModels from "../../../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";

const SuratPernyataanBebasBabiForm = () => {

    const [nama, setNama] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [ktp, setKTP] = useState("")
    const [perusahaan, setPerusahaan] = useState("")


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
                <h3 className='mb-0'>Halaman 4</h3>
                <small className='text-muted'>Surat Pernyataan Bebas Babi</small>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Nama
                        </Label>
                        <Input type='text' name='nama' id='nama' onChange={(e)=>{
                            setNama(
                                e.target.value)
                        }} placeholder='Nama' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Jabatan
                        </Label>
                        <Input type='text' name='jabatan' id='jabatan' onChange={(e)=>{
                            setJabatan(e.target.value)
                        }} placeholder='Jabatan' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            No. KTP
                        </Label>
                        <Input type='text' name='ktp' id='ktp' onChange={(e)=>{
                            setKTP(e.target.value)
                        }} placeholder='Nomor KTP' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Perusahaan
                        </Label>
                        <Input type='text' name='perusahaan' id='perusahaan' onChange={(e)=>{
                            setPerusahaan(e.target.value)
                        }} placeholder='Perusahaan' />
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
export default SuratPernyataanBebasBabiForm
