// ** Reactstrap Imports
import {Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label, Progress} from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useEffect, useState} from "react";
import CompanyProfileModels from "../../../../models/CompanyProfile";
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
    const [details,setDetails] = useState([])

    const [progressValue, setProgressValue] = useState(10)
    const value = 10

    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    const getCompanyProfile = async (id) => {
        try {
            const result = await companyProfileModel.getById(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getCompanyProfile(sessionStorage.perusahaan_id)
    },[])


    const submit = async () => {
        const body = {
            nama_perusahaan: namaPerusahaan? namaPerusahaan : details.nama_perusahaan,
            nomor_induk_berusaha: nib? nib : details.nomor_induk_berusaha,
            skala_usaha: skalaUsaha? skalaUsaha : details.skala_usaha,
            nama_pimpinan: namaPimpinan? namaPimpinan: details.nama_pimpinan,
            alamat_perusahaan: alamatPerusahaan? alamatPerusahaan : details.alamat_perusahaan,
            telp_fax_perusahaan: telpFaxPerusahaan? telpFaxPerusahaan : details.telp_fax_perusahaan,
            alamat_fasilitas_produksi: alamatFasilitasProduksi? alamatFasilitasProduksi : details.alamat_fasilitas_produksi,
            telp_fax_fasilitas_produksi: telpFaxFasilitasProduksi? telpFaxFasilitasProduksi : details.telp_fax_fasilitas_produksi,
            contact_person_email: contactPersonEmail? contactPersonEmail : details.contact_person_email,
            nomor_izin_edar: nomorIzinEdar? nomorIzinEdar : details.nomor_izin_edar,
            jenis_produk: jenisProduk? jenisProduk : details.jenis_produk,
            daerah_pemasaran: daerahPemasaran? daerahPemasaran : details.daerah_pemasaran,
            sistem_pemasaran: sistemPemasaran? sistemPemasaran : details.sistem_pemasaran,
            tujuan: tujuan? tujuan : details.tujuan,
            ruang_lingkup: ruangLingkup? ruangLingkup : details.ruang_lingkup,
            id: sessionStorage.perusahaan_id
        }
        if (sessionStorage.perusahaan_id !== null) {
            try {
                const result = await companyProfileModel.editCompanyProfile(sessionStorage.sjph_id,sessionStorage.perusahaan_id,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di-edit','success')
                        .then(()=>{
                            getCompanyProfile(sessionStorage.perusahaan_id)
                        })
                } else {
                    await swal.fire('','Data gagal di-edit', 'error')
                }
            } catch (e) {
                console.error(e)
                await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Kesalahan! Mohon kontak admin.")
            }
        } else {
            try {
                const result = await companyProfileModel.createCompanyProfile(sessionStorage.sjph_id,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            navigate('/sjph/informasi_umum_perusahaan')
                        })
                } else {
                    await swal.fire('','Data gagal disimpan', 'error')
                }
            } catch (e) {
                console.error(e)
                await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Kesalahan! Mohon kontak admin.")
            }
        }
    }
    const handlePageChange = page => {
        console.log(page);
    };

    return (
        <Card>
            {/*<Progress striped animated value={progressValue} max={100} />*/}
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
                            <Input type='text' name='namaPerusahaan' id='namaPerusahaan'
                                   defaultValue={ details.id && details.nama_perusahaan } onChange={(e)=>{
                                setNamaPerusahaan(e.target.value)
                            }} placeholder='Nama Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='lastNameMulti'>
                                Nomor Induk Berusaha
                            </Label>
                            <Input type='text' name='nib' id='nib'
                                   defaultValue={ details.id && details.nomor_induk_berusaha } onChange={(e)=>{
                                setNib(e.target.value)
                            }} placeholder='Nomor Induk Berusaha' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='cityMulti'>
                                Skala Usaha
                            </Label>
                            <Input type='text' name='skalaUsaha' id='skalaUsaha'
                                   defaultValue={ details.id && details.skala_usaha } onChange={(e)=>{
                                setSkalaUsaha(e.target.value)
                            }} placeholder='Skala Usaha' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='CountryMulti'>
                                Nama Pimpinan
                            </Label>
                            <Input type='text' name='namaPimpinan' id='namaPimpinan'
                                   defaultValue={ details.id && details.nama_pimpinan } onChange={(e)=>{
                                setNamaPimpinan(e.target.value)
                            }} placeholder='Nama Pimpinan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='CompanyMulti'>
                                Nama Penyelia Halal
                            </Label>
                            <Input type='text' name='namaPenyeliaHalal' id='namaPenyeliaHalal'
                                    onChange={(e)=>{
                                setNamaPenyelia(e.target.value)
                            }} placeholder='Nama Penyelia Halal' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Alamat Perusahaan
                            </Label>
                            <Input type='text' name='alamatPerusahaan' id='alamatPerusahaan'
                                   defaultValue={ details.id && details.alamat_perusahaan } onChange={(e)=>{
                                setAlamatPerusahaan(e.target.value)
                            }} placeholder='Alamat Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Telp/Fax Perusahaan
                            </Label>
                            <Input type='text' name='telpFaxPerusahaan' id='telpFaxPerusahaan'
                                   defaultValue={ details.id && details.telp_fax_perusahaan } onChange={(e)=>{
                                setTelpFaxPerusahaan(e.target.value)
                            }} placeholder='Telp/Fax Perusahaan' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Alamat Fasilitas Produksi
                            </Label>
                            <Input type='text' name='alamatFasilitasProduksi' id='alamatFasilitasProduksi'
                                   defaultValue={ details.id && details.alamat_fasilitas_produksi } onChange={(e)=>{
                                setAlamatFasilitasProduksi(e.target.value)
                            }} placeholder='Alamat Fasilitas Produksi' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Telp/Fax Fasilitas Produksi
                            </Label>
                            <Input type='text' name='telpFaxFasilitasProduksi' id='telpFaxFasilitasProduksi'
                                   defaultValue={ details.id && details.telp_fax_fasilitas_produksi } onChange={(e)=>{
                                setTelpFaxFasilitasProduksi(e.target.value)
                            }} placeholder='Telp/Fax Fasilitas Produksi' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Contact Person / Email
                            </Label>
                            <Input type='text' name='contactPersonEmail' id='contactPersonEmail'
                                   defaultValue={ details.id && details.contact_person_email } onChange={(e)=>{
                                setContactPersonEmail(e.target.value)
                            }} placeholder='Contact Person / Email' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Nomor Izin Edar
                            </Label>
                            <Input type='text' name='nomorIzinEdar' id='nomorIzinEdar'
                                   defaultValue={ details.id && details.nomor_izin_edar } onChange={(e)=>{
                                setNomorIzinEdar(e.target.value)
                            }} placeholder='Nomor Izin Edar' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Jenis Produk
                            </Label>
                            <Input type='text' name='jenisProduk' id='jenisProduk'
                                   defaultValue={ details.id && details.jenis_produk } onChange={(e)=>{
                                setJenisProduk(e.target.value)
                            }} placeholder='Jenis Produk' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Daerah Pemasaran
                            </Label>
                            <Input type='text' name='daerahPemasaran' id='daerahPemasaran'
                                   defaultValue={ details.id && details.daerah_pemasaran } onChange={(e)=>{
                                setDaerahPemasaran(e.target.value)
                            }} placeholder='Daerah Pemasaran' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='EmailMulti'>
                                Sistem Pemasaran
                            </Label>
                            <Input type='text' name='sistemPemasaran' id='sistemPemasaran'
                                   defaultValue={ details.id && details.sistem_pemasaran } onChange={(e)=>{
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
                                type='textarea'
                                id='tujuan'
                                placeholder='Tujuan'
                                style={{ minHeight: '100px' }}
                                onChange={e => setTujuan(e.target.value)}
                                defaultValue={ details.id && details.tujuan }
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
                                type='textarea'
                                id='ruangLingkup'
                                placeholder='Tujuan'
                                style={{ minHeight: '100px' }}
                                onChange={e => setRuangLingkup(e.target.value)}
                                defaultValue={ details.id && details.ruang_lingkup }
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
                                {/*<Button className='me-1' color='primary' onClick={()=>setProgressValue(100)}>*/}
                                    Save
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
