// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '@styles/react/libs/editor/editor.scss'
import classnames from "classnames";
import {useState, Fragment, useEffect} from "react";
import KebijakanEdukasiHalalModels from "../../../../models/KebijakanEdukasiHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {ArrowLeft, ArrowRight} from "react-feather";

const EvaluasiPelatihanInternalForm = ({stepper,setCheckpoint}) => {

    // const [hariTanggal, setHariTanggal] = useState("")
    // const [pematri, setPematri] = useState("")
    // const [materi, setMateri] = useState("")
    const [soal, setSoal] = useState(()=>EditorState.createEmpty())
    const [details, setDetails] = useState(EditorState.createEmpty())
    const [soalRaw, setSoalRaw] = useState(null)


    const kebijakanEdukasiHalalModel = new KebijakanEdukasiHalalModels()

    const navigate = useNavigate()

    const getSJPHBySJPHID = async (id) => {
        try {
            const result = await kebijakanEdukasiHalalModel.getEvaluasiPelatihanInternal(id)
            setSoal(EditorState.createWithContent(convertFromRaw(JSON.parse(result.soal_evaluasi_pelatihan_internal))))
        } catch (e) {
            console.error(e)
        }
    }

    const submit = async () => {
        const body = {
            soal_evaluasi_pelatihan_internal: soalRaw
        }
        try {
            const result = await kebijakanEdukasiHalalModel.createSoalEvaluasiPelatihanEvaluasi(sessionStorage.sjph_id,body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getSJPHBySJPHID(sessionStorage.sjph_id)
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
        getSJPHBySJPHID(sessionStorage.sjph_id)
    },[])

    const updateTextDesc = async (state) => {
        await setSoal(state)
        const data = convertToRaw(soal.getCurrentContent())
        setSoalRaw(data)
        console.log(soalRaw)
    }

    return (
        <Fragment>
            <div className='content-header'>
                <h3 className='mb-0'>Wisata 1</h3>
                <small className='text-muted'>Cari tahu tentang kebijakan halal</small>
            </div>
            <Form>
                <Row>
                    <Col md='12' sm='12' className='mb-1'>
                        <Label className='form-label' for='soal'>
                            Soal Evaluasi
                        </Label>
                        <Editor name='soal' id='soal'
                                placeholder=
                                    'Contoh Soal Pelatihan Internal
1. Contoh bahan haram yaitu …
2. Dalam proses produk halal hanya menggunakan bahan dengan nama/merek dan
produsen seperti yang tercantum dalam …
3. Jika akan menggunakan bahan baru di luar Daftar Bahan Halal(termasuk bahan lama
dengan produsen baru), akan meminta persetujuan penggunaan bahan tersebut ke
…
4. Pada proses produksi, semua fasilitas produksi dan peralatan harus dalam keadaan
…
5. Audit internal dilakukan minimal … kali dalam setahun.'
                                editorState={soal} onEditorStateChange={updateTextDesc} />
                    </Col>
                    <Col sm='12'>
                        <div className='d-flex justify-content-center'>
                            <Button className='me-1 ms-1' color='primary' onClick={() => {
                                stepper.previous()
                                setCheckpoint(0)
                            }} outline>
                                {/*<Button className='me-1' color='primary' onClick={()=>setProgressValue(100)}>*/}
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                            </Button>
                            <Button className='me-1' color='primary' onClick={submit}>
                                Submit
                            </Button>
                            <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/bahan_untuk_kepentingan_halal')}>
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
export default EvaluasiPelatihanInternalForm
