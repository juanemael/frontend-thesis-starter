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

const CompanyForm = () => {

    const [hariTanggal, setHariTanggal] = useState("")
    const [pematri, setPematri] = useState("")
    const [materi, setMateri] = useState("")


    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    const submit = async () => {
        const body = {
            hari_tanggal: hariTanggal,
            pematri,
            materi
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
                <small className='text-muted'>Cari tahu tentang kebijakan halal</small>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Hari/Tanggal
                        </Label>
                        <Input type='text' name='namaPerusahaan' id='namaPerusahaan' onChange={(e)=>{
                            setHariTanggal(
                                e.target.value)
                        }} placeholder='Nama Perusahaan' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                           Pematri
                        </Label>
                        <Input type='text' name='nib' id='nib' onChange={(e)=>{
                            setPematri(e.target.value)
                        }} placeholder='Nomor Induk Berusaha' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='lastNameMulti'>
                            Materi yang disampaikan
                        </Label>
                        <Input type='text' name='nib' id='nib' onChange={(e)=>{
                            setMateri(e.target.value)
                        }} placeholder='Nomor Induk Berusaha' />
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
export default CompanyForm