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
import {useState, Fragment, useEffect} from "react";
import KebijakanEdukasiHalalModels from "../../../../models/KebijakanEdukasiHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {ArrowLeft, ArrowRight, Check, ChevronDown, Edit, FileText, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
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

const SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable = ({stepper, setCheckpoint}) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [nama, setNama] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [posisiDiTim, setPosisiDiTim] = useState("")
    const [details,setDetails] = useState([])


    const kebijakanEdukasiHalalModel = new KebijakanEdukasiHalalModels()

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

    const columns = [
        {
            name: 'No.',
            // minWidth: '150px',
            selector: row => row.id,
            sortable: row => row.id
        },
        {
            name: 'Nama',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama
        },
        {
            name: 'Jabatan',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.jabatan
        },

        {
            name: 'Posisi di Tim',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.posisi_di_tim
        },
        {
            name: 'Menu',
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
                                <DropdownItem className='w-100' onClick={()=>{ deleteSJPH(row.id) }}>
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
            updatedData = details.filter(item => {
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
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(details.length / 7) || 1}
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

    const getSuratKeputusanBySJPHID = async (id) => {
        try {
            const result = await kebijakanEdukasiHalalModel.getSuratKeputusanBySJPHID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    const submit = async () => {
        const body = {
            nama,
            jabatan,
            posisi_di_tim: posisiDiTim
        }
        try {
            const result = await kebijakanEdukasiHalalModel.createSuratKeputusan(sessionStorage.sjph_id,body)
            if ((result.surat_keputusan_ptmp_halal_id)||(result.success)) {
                sessionStorage.surat_keputusan_ptmp_halal_id = result.surat_keputusan_ptmp_halal_id
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getSuratKeputusanBySJPHID(sessionStorage.sjph_id)
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
        getSuratKeputusanBySJPHID(sessionStorage.sjph_id)
    },[])


    return (
        <Fragment>
            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>Tambah Data Tabel</h1>
                        <p>Tambah data tabelmu sekarang</p>
                    </div>
                    <Row tag='form' className='gy-1 pt-75' >
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='nama'>
                                Nama
                            </Label>
                            <Input
                                id='nama'
                                placeholder='Budi'
                                value={nama}
                                onChange={(e)=>{ setNama(e.target.value) }}
                                invalid={errors.nama && true}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='jabatan'>
                                Jabatan
                            </Label>
                            <Input id='jabatan' placeholder='Pimpinan Perusahaan/CEO/CTO'
                                   onChange={(e)=>{ setJabatan(e.target.value) }} invalid={errors.jabatan && true} />

                             </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='posisi_di_tim'>
                                Posisi Di Tim
                            </Label>
                            <Input id='posisi_di_tim' placeholder='Ketua/Anggota'
                                   onChange={(e)=>{ setPosisiDiTim(e.target.value) }}
                                   invalid={errors.username && true} />
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
                <h3 className='mb-0'>Halaman 1</h3>
                <small className='text-muted'>Surat Keputusan Penetapan Tim Manajemen Halal Dan/Atau Penyelia Halal</small>
            </div>
            <Row className='justify-content-end mx-0'>
                <Col className='d-flex align-items-center justify-content-end mt-1' md='4' sm='12'>
                    <Label className='me-1' for='search-input'>
                        Cari
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
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : details}
                />
            </div>
            &nbsp;
            <Col sm='12'>
                <div className='d-flex justify-content-center'>
                    <Button className='me-1 ms-1' color='primary' onClick={()=>navigate('/sjph/kriteria_sistem_jaminan_produk_halal')} outline>
                        {/*<Button className='me-1' color='primary' onClick={()=>setProgressValue(100)}>*/}
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                    </Button>
                    <Button className='me-1' color='primary' onClick={() => setShow(true)}>
                        Tambah
                    </Button>
                    <Button className='me-1' color='primary' onClick={()=>{
                        stepper.next()
                        setCheckpoint(1)
                    }}>
                        <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
            </Col>
        </Fragment>
    )

}
export default SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable
