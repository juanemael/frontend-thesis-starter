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
import CompanyProfileModels from "../../../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {Check, Edit, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
}

const KajiUlangManajemenTable = () => {

    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")


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
        </Fragment>
    )

}
export default KajiUlangManajemenTable
