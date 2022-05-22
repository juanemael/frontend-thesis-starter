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
    Row, Label, Input, FormFeedback, Modal
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment} from "react";
import SJPHModels from "../../../../models/SJPHKu";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {Check, Edit, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";

import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
]

const countryOptions = [
    { value: 'uk', label: 'UK' },
    { value: 'usa', label: 'USA' },
    { value: 'france', label: 'France' },
    { value: 'russia', label: 'Russia' },
    { value: 'canada', label: 'Canada' }
]

const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'dutch', label: 'Dutch' }
]

const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
}
const MySJPHTable = () => {

    const [sjphName, setSJPHName] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")


    const sjphModel = new SJPHModels()

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
            nama_sjph: sjphName
        }
        try {
            const result = await sjphModel.createSJPH(body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        navigate('/sjph/sjph_ku')
                    })
            } else {
                await swal.fire('','Data gagal disimpan', 'error')
            }
        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }

    const getSJPH = async () => {
        try {
            const result = await sjphModel.getAll()

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Fragment>
            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>Tambah Data Tabel</h1>
                        <p>Tambah data tabelmu sekarang</p>
                    </div>
                    <Row tag='form' className='gy-1 pt-75'>
                        <Col xs={12}>
                            <Label className='form-label' for='sjphName'>
                                SJPH Name
                            </Label>
                            <Input id='sjphName' placeholder='SJPH Tahun 2022' value={sjphName} onChange={(e)=> setSJPHName(e.target.value)} invalid={errors.sjphName && true} />
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button onClick={submit} className='me-1' color='primary'>
                                Submit
                            </Button>
                            <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                                Discard
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <div className='content-header'>
                <h3 className='mb-0'>Daftar SJPH</h3>
                <small className='text-muted'>Berikut adalah tabel daftar SJPH yang dibuat oleh kamu</small>
            </div>
            <Table responsive>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>SJPH Name</th>
                    <th>Created At</th>
                    <th>Modified At</th>
                    <th>Menu</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
            &nbsp;
            <Col sm='12'>
                <div className='d-flex justify-content-end'>
                    <Button className='me-1' color='primary' onClick={()=> setShow(true)}>
                        Tambah
                    </Button>
                </div>
            </Col>
        </Fragment>
    )

}
export default MySJPHTable
