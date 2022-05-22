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

const DaftarBahanTable = () => {

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
            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>Tambah Data Tabel</h1>
                        <p>Tambah data tabelmu sekarang</p>
                    </div>
                    <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmitModal)}>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='firstName'>
                                First Name
                            </Label>
                            <Controller
                                control={control}
                                name='firstName'
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            id='firstName'
                                            placeholder='John'
                                            value={field.value}
                                            invalid={errors.firstName && true}
                                        />
                                    )
                                }}
                            />
                            {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='lastName'>
                                Last Name
                            </Label>
                            <Controller
                                name='lastName'
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                                )}
                            />
                            {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                        </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='username'>
                                Username
                            </Label>
                            <Controller
                                name='username'
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                                )}
                            />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='email'>
                                Billing Email
                            </Label>
                            <Input type='email' id='email' placeholder='example@domain.com' />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='status'>
                                Status:
                            </Label>
                            <Select
                                id='status'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusOptions}
                                theme={selectThemeColors}
                                defaultValue={statusOptions[0]}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tax-id'>
                                Tax ID
                            </Label>
                            <Input id='tax-id' defaultValue='Tax-8894' placeholder='Tax-1234' />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='contact'>
                                Contact
                            </Label>
                            <Input id='contact' defaultValue='+1 609 933 4422' placeholder='+1 609 933 4422' />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='language'>
                                Language
                            </Label>
                            <Select
                                id='language'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={languageOptions}
                                theme={selectThemeColors}
                                defaultValue={languageOptions[0]}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='country'>
                                Country
                            </Label>
                            <Select
                                id='country'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={countryOptions}
                                theme={selectThemeColors}
                                defaultValue={countryOptions[0]}
                            />
                        </Col>
                        <Col xs={12}>
                            <div className='d-flex align-items-center'>
                                <div className='form-switch'>
                                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                                    <Label className='form-check-label' htmlFor='billing-switch'>
                                    <span className='switch-icon-left'>
                                      <Check size={14} />
                                    </span>
                                        <span className='switch-icon-right'>
                                          <X size={14} />
                                        </span>
                                    </Label>
                                </div>
                                <Label className='form-check-label fw-bolder' htmlFor='billing-switch'>
                                    Use as a billing address?
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button type='submit' className='me-1' color='primary'>
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
                <h3 className='mb-0'>Halaman 1</h3>
                <small className='text-muted'>Daftar Bahan</small>
            </div>
            <Table responsive>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama dan Merek</th>
                    <th>Jenis Bahan</th>
                    <th>Produsen</th>
                    <th>Negara</th>
                    <th>Supplier</th>
                    <th>Lembaga Penerbit Sert. Halal</th>
                    <th>Nomor Sertifikast Halal</th>
                    <th>Masa Berlaku Sertifikat Halal</th>
                    <th>Dokumen Pedukung</th>
                    <th>Menu</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <span className='align-middle fw-bold'>1.</span>
                    </td>
                    <td>Tepung, Tiga Roda</td>
                    <td>
                        <Badge pill color='light-primary' className='me-1'>
                            Bahan Baku
                        </Badge>
                    </td>
                    <td>PT. Informatika</td>
                    <td>Negara</td>
                    <td>Supplier</td>
                    <td>MUI</td>
                    <td>18930</td>
                    <td>11-09-2024</td>
                    <td>Dokumen</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
                </tbody>
            </Table>
            <Col sm='12'>
                <div className='d-flex justify-content-end'>
                    <Button className='me-1' color='primary' onClick={() => setShow(true)}>
                        Tambah
                    </Button>
                </div>
            </Col>
        </Fragment>
    )

}
export default DaftarBahanTable
