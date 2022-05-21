// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useState} from "react";
import CompanyProfileModels from "../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";

const CompanyForm = () => {

    const [tujuan, setTujuan] = useState("")
    const [ruangLingkup, setRuangLingkup] = useState("")
    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [nib, setNib] = useState("")
    const [skalaUsaha, setSkalaUsaha] = useState("")
    const [namaPimpinan, setNamaPimpinan] = useState("")
    const [namaPenyelia, setNamaPenyelia] = useState("")
    const [alamatPerusahaan, setAlamatPerusahaan] = useState("")
    const [telpFaxPerusahaan, setTelpFaxPerusahaan] = useState("")
    const [alamatFasilitasProduksi, setAlamatFasilitasProduksi] = useState("")
    const [telpFaxFasilitasProduksi, setTelpFaxFasilitasProduksi] = useState("")
    const [contactPersonEmail, setContactPersonEmail] = useState("")
    const [nomorIzinEdar, setNomorIzinEdar] = useState("")
    const [jenisProduk, setJenisProduk] = useState("")
    const [daerahPemasaran, setDaerahPemasaran] = useState("")
    const [sistemPemasaran, setSistemPemasaran] = useState("")

    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    const submit = async () => {
        const body = {
            nama_perusahaan: namaPerusahaan,
            nomor_induk_berusaha: nib,
            skala_usaha: skalaUsaha,
            nama_pimpinan: namaPimpinan,
            alamat_perusahaan: alamatPerusahaan,
            telp_fax_perusahaan: telpFaxPerusahaan,
            alamat_fasilitas_produksi: alamatFasilitasProduksi,
            telp_fax_fasilitas_produksi: telpFaxFasilitasProduksi,
            contact_person_email: contactPersonEmail,
            nomor_izin_edar: nomorIzinEdar,
            jenis_produk: jenisProduk,
            daerah_pemasaran: daerahPemasaran,
            sistem_pemasaran: sistemPemasaran,
            tujuan,
            ruang_lingkup: ruangLingkup
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
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Informasi Perusahaan</CardTitle>
            </CardHeader>

            <CardBody>
                <Form>
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
                                Nomor Induk Berusaha
                            </Label>
                            <Input type='text' name='nib' id='nib' onChange={(e)=>{
                                setNib(e.target.value)
                            }} placeholder='Nomor Induk Berusaha' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='cityMulti'>
                                Skala Usaha
                            </Label>
                            <Input type='text' name='skalaUsaha' id='skalaUsaha' onChange={(e)=>{
                                setSkalaUsaha(e.target.value)
                            }} placeholder='Skala Usaha' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='CountryMulti'>
                                Nama Pimpinan
                            </Label>
                            <Input type='text' name='namaPimpinan' id='namaPimpinan' onChange={(e)=>{
                                setNamaPimpinan(e.target.value)
                            }} placeholder='Nama Pimpinan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='CompanyMulti'>
                                Nama Penyelia Halal
                            </Label>
                            <Input type='text' name='namaPenyeliaHalal' id='namaPenyeliaHalal' onChange={(e)=>{
                                setNamaPenyelia(e.target.value)
                            }} placeholder='Nama Penyelia Halal' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Alamat Perusahaan
                            </Label>
                            <Input type='text' name='alamatPerusahaan' id='alamatPerusahaan' onChange={(e)=>{
                                setAlamatPerusahaan(e.target.value)
                            }} placeholder='Alamat Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Telp/Fax Perusahaan
                            </Label>
                            <Input type='text' name='telpFaxPerusahaan' id='telpFaxPerusahaan' onChange={(e)=>{
                                setTelpFaxPerusahaan(e.target.value)
                            }} placeholder='Telp/Fax Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Alamat Fasilitas Produksi
                            </Label>
                            <Input type='text' name='alamatFasilitasProduksi' id='alamatFasilitasProduksi' onChange={(e)=>{
                                setAlamatFasilitasProduksi(e.target.value)
                            }} placeholder='Alamat Fasilitas Produksi' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Telp/Fax Fasilitas Produksi
                            </Label>
                            <Input type='text' name='telpFaxFasilitasProduksi' id='telpFaxFasilitasProduksi' onChange={(e)=>{
                                setTelpFaxFasilitasProduksi(e.target.value)
                            }} placeholder='Telp/Fax Fasilitas Produksi' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Contact Person / Email
                            </Label>
                            <Input type='text' name='contactPersonEmail' id='contactPersonEmail' onChange={(e)=>{
                                setContactPersonEmail(e.target.value)
                            }} placeholder='Contact Person / Email' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Nomor Izin Edar
                            </Label>
                            <Input type='text' name='nomorIzinEdar' id='nomorIzinEdar' onChange={(e)=>{
                                setNomorIzinEdar(e.target.value)
                            }} placeholder='Nomor Izin Edar' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Jenis Produk
                            </Label>
                            <Input type='text' name='jenisProduk' id='jenisProduk' onChange={(e)=>{
                                setJenisProduk(e.target.value)
                            }} placeholder='Jenis Produk' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Daerah Pemasaran
                            </Label>
                            <Input type='text' name='daerahPemasaran' id='daerahPemasaran' onChange={(e)=>{
                                setDaerahPemasaran(e.target.value)
                            }} placeholder='Daerah Pemasaran' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Sistem Pemasaran
                            </Label>
                            <Input type='text' name='sistemPemasaran' id='sistemPemasaran' onChange={(e)=>{
                                setSistemPemasaran(e.target.value)
                            }} placeholder='Sistem Pemasaran' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Tujuan
                            </Label>
                            {/*<Editor editorState={value} onEditorStateChange={data => setValue(data)} />*/}
                            <Input
                                name='tujuan'
                                value={tujuan}
                                type='textarea'
                                id='tujuan'
                                placeholder='Tujuan'
                                style={{ minHeight: '100px' }}
                                onChange={e => setTujuan(e.target.value)}
                                className={classnames({ 'text-danger': tujuan.length > 20 })}
                            />
                            <span
                                className={classnames('textarea-counter-value float-end', {
                                    'bg-danger': tujuan.length > 20
                                })}
                            >
                            {`${tujuan.length}/20`}
                            </span>
                            {/*<Editor />*/}
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Ruang Lingkup
                            </Label>
                            <Input
                                name='ruangLingkup'
                                value={ruangLingkup}
                                type='textarea'
                                id='ruangLingkup'
                                placeholder='Tujuan'
                                style={{ minHeight: '100px' }}
                                onChange={e => setRuangLingkup(e.target.value)}
                                className={classnames({ 'text-danger': ruangLingkup.length > 20 })}
                            />
                            <span
                                className={classnames('textarea-counter-value float-end', {
                                    'bg-danger': ruangLingkup.length > 20
                                })}
                            >
                            {`${ruangLingkup.length}/20`}
                            </span>
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
            </CardBody>
        </Card>
    )

}
export default CompanyForm
