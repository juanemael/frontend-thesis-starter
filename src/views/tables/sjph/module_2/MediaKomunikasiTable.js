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
import {useState, Fragment, forwardRef, useEffect} from "react";
import KriteriaSJPHKebijakanHalalModels from "../../../../models/KriteriaSJPHKebijakanHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import {Check, ChevronDown, Edit, FileText, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";

import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";

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
const MediaKomunikasiTable = () => {

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [mediaKomunikasi, setMediaKomunikasi] = useState([])


    const kriteriaSJPHKebijakanHalalModel = new KriteriaSJPHKebijakanHalalModels()

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

    const getMediaKomunikasi = async () => {
        try {
            const result = await kriteriaSJPHKebijakanHalalModel.getMediaKomunikasiAll()
            setMediaKomunikasi(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getMediaKomunikasi()
    },[])


    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        const status = {
            1: { title: 'Current', color: 'light-primary' },
            2: { title: 'Professional', color: 'light-success' },
            3: { title: 'Rejected', color: 'light-danger' },
            4: { title: 'Resigned', color: 'light-warning' },
            5: { title: 'Applied', color: 'light-info' }
        }

        if (value.length) {
            updatedData = sjph.filter(item => {
                const startsWith =
                    item.nama_sjph.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.modified_at.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.nama_sjph.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.modified_at.toLowerCase().startsWith(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(sjph.length / 7) || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        />
    )

    const BootstrapCheckbox = forwardRef((props, ref) => (
        <div className='form-check'>
            <Input type='checkbox' ref={ref} {...props} />
        </div>
    ))

    const columns = [
        {
            name: 'ID',
            // minWidth: '150px',
            selector: row => row.sjph_id,
            sortable: row => row.sjph_id
        },
        {
            name: 'Nama SJPH',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_sjph
        },
        {
            name: 'Dibuat pada',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.created_at
        },

        {
            name: 'Diubah pada',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.modified_at
        },
        {
            name:  'Pilihan',
            cell:  (row) => {
                return (
                    <Button className='me-1' color='primary' onClick={()=>{ selectSJPH(row.sjph_id,row.perusahaan_id,row.nama_sjph) }}>
                        Pilih
                    </Button>
                )
            }
        },
        {
            name: 'Tindakan',
            allowOverflow: false,
            cell: (row) => {
                return (
                    <div className='d-flex'>
                        <UncontrolledDropdown>
                            <DropdownToggle className='pe-1' tag='span' >
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Details</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{ deleteSJPH(row.sjph_id) }}>
                                    <Trash size={15} />
                                    <span className='align-middle ms-50'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Edit size={15} />
                    </div>
                )
            }
        }
    ]

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
                <h3 className='mb-0'>Halaman 2</h3>
                <small className='text-muted'>Cari tahu tentang kebijakan halal</small>
            </div>
            <Row className='justify-content-end mx-0'>
                <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                    <Label className='me-1' for='search-input'>
                        Search
                    </Label>
                    <Input
                        className='dataTable-filter mb-50'
                        type='text'
                        bsSize='sm'
                        id='search-input'
                        value={searchValue}
                        onChange={handleFilter}
                    />
                </Col>
            </Row>
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    selectableRows
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : mediaKomunikasi}
                    selectableRowsComponent={BootstrapCheckbox}
                />
            </div>
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
export default MediaKomunikasiTable
