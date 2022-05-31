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
import {useState, Fragment, useEffect, forwardRef} from "react";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {ArrowLeft, ArrowRight, Check, ChevronDown, Edit, FileText, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component";
import KriteriaSJPHKebijakanHalalModels from "../../../../models/KriteriaSJPHKebijakanHalal";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import BahanKepentinganHalal from "../../../../models/BahanKepentinganHalal";

const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
}

const DaftarBahanTable = ({stepper, setCheckpoint}) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tanggalSosialisasi, setTanggalSosialisasi] = useState(new Date())
    const [judulKegiatan, setJudulKegiatan] = useState("")
    const [peserta, setPeserta] = useState("")
    const [mediaKomunikasi, setMediaKomunikasi] = useState([])
    const [namaMerek, setNamaMerek] = useState("")
    const [jenisBahan,setJenisBahan] = useState("")
    const [produsen, setProdusen] = useState("")
    const [negara, setNegara] = useState("")
    const [supplier, setSupplier] = useState("")
    const [lembagaPenerbitSertHalal, setLembagaPenerbitSertHalal] = useState("")
    const [nomorSertHalal, setNomorSertHalal] = useState("")
    const [masaBerlakuSertHalal, setMasaBerlakuSertHalal] = useState("")
    const [dokumenPendukung, setDokumenPendukung] = useState("")
    const [details, setDetails] = useState([])
        // {
        //     id: 1,
        //     nama_dan_merek: 'Tepung beras Rosebrand',
        //     jenis_bahan: 'Tepung',
        //     produsen: 'PT. Indofood',
        //     negara: 'Indonesia',
        //     supplier: 'Supplier Indofood',
        //     lembaga_penerbit_sert_halal: 'MUI',
        //     no_sert_halal: '08456413651',
        //     masa_berlaku_sert_halal: '2018',
        //     dokumen_pendukung: 'Dokumen'
        // }

    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()

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

    const getDaftarBahanAll = async () => {
        try {
            const result = await bahanKepentinganHalalModel.getDaftarBahanAll()
            setMediaKomunikasi(result)
        } catch (e) {
            console.error(e)
        }
    }
    const getDaftarBahanBySJPHID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getDaftarBahanBySJPHID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getDaftarBahanBySJPHID(sessionStorage.sjph_id)
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

    const BootstrapCheckbox = forwardRef((props, ref) => (
        <div className='form-check'>
            <Input type='checkbox' ref={ref} {...props} />
        </div>
    ))

    const deleteMediaKomunikas = async (id) => {
    }

    const columns = [
        {
            name: 'ID',
            // minWidth: '150px',
            selector: row => row.id,
            sortable: row => row.id
        },
        {
            name: 'Nama dan Merek',
            sortable: true,
            selector: row => row.nama_dan_merek
        },
        {
            name: 'Jenis Bahan',
            sortable: true,

            // minWidth: '150px',
            selector: row => row.jenis_bahan
        },
        {
            name: 'Produsen',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.produsen
        },
        {
            name: 'Negara',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.negara
        },
        {
            name: 'Supplier',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.supplier
        },
        {
            name: `Lembaga Penerbit Sert. Halal`,
            sortable: true,
            // minWidth: '150px',

            selector: row => row.lembaga_penerbit_sert_halal
        },
        {
            name: 'Nomor Sertifikat Halal',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.no_sert_halal
        },
        {
            name: 'Masa Berlaku Sertifikat Halal',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.masa_berlaku_sert_halal
        },
        {
            name: 'Dokumen Pendukung',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.dokumen_pendukung
        },
        {
            name: 'Tindakan',
            allowOverflow: false,
            cell: (row) => {
                return (
                    <div className='d-flex'>
                        <UncontrolledDropdown>
                            <DropdownToggle className='cursor-pointer pe-1' tag='span' >
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu container={'body'} end>
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

    const submit = async () => {
        const body = {
            nama_dan_merek: namaMerek,
            jenis_bahan: jenisBahan,
            produsen,
            negara,
            supplier,
            lembaga_penerbit_sert_halal: lembagaPenerbitSertHalal,
            no_sert_halal: nomorSertHalal,
            masa_berlaku_sert_halal: masaBerlakuSertHalal,
            dokumen_pendukung: dokumenPendukung
        }
        try {
            const result = await bahanKepentinganHalalModel.createDaftarBahan(sessionStorage.sjph_id,body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getDaftarBahanBySJPHID(sessionStorage.sjph_id)
                        setShow(false)
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
                    <Row tag='form' className='gy-1 pt-75' >
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tanggalPersetujuan'>
                                Nama dan Merek
                            </Label>
                            <Input id='judulKegiatan' placeholder='Kegiatan'
                                   onChange={(e)=>{ setNamaMerek(e.target.value) }}  invalid={errors.judulKegiatan && true} />
                            {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='judulKegiatan'>
                                Jenis Bahan
                            </Label>
                            <Input id='judulKegiatan' placeholder='Kegiatan'
                                   onChange={(e)=>{ setJenisBahan(e.target.value) }}  invalid={errors.judulKegiatan && true} />
                            {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='peserta'>
                                Produsen
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan'
                                   onChange={(e)=>{ setProdusen(e.target.value) }} invalid={errors.peserta && true} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='peserta'>
                                Negara
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan'
                                   onChange={(e)=>{ setNegara(e.target.value) }} invalid={errors.peserta && true} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='peserta'>
                                Supplier
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan'
                                   onChange={(e)=>{ setSupplier(e.target.value) }} invalid={errors.peserta && true} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='peserta'>
                                Lembaga Penerbit Sertifikasi Halal
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan'
                                   onChange={(e)=>{ setLembagaPenerbitSertHalal(e.target.value) }} invalid={errors.peserta && true} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='peserta'>
                                Nomor Sertifikasi Halal
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan'
                                   onChange={(e)=>{ setNomorSertHalal(e.target.value) }} invalid={errors.peserta && true} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='peserta'>
                                Masa Berlaku Sertifikat Halal
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan'
                                   onChange={(e)=>{ setMasaBerlakuSertHalal(e.target.value) }} invalid={errors.peserta && true} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col md={12} xs={12}>
                            <Label className='form-label' for='dokumenPendukung'>
                                Dokumen Pendukung
                            </Label>
                            <Input type='file' id='dokumenPendukung' name='dokumenPendukung' />
                            {/*<Input id='dokumenPendukung' placeholder='Isi Nomor Sertifikasi Halal'*/}
                            {/*       onChange={(e)=>{ setDokumenPendukung(e.target.value) }} invalid={errors.peserta && true} />*/}
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
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
                <small className='text-muted'>Daftar Bahan</small>
            </div>
            <Row className='justify-content-end mx-0'>
                <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
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
                    // selectableRows
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : details}
                    // selectableRowsComponent={BootstrapCheckbox}
                />
            </div>

            <Col sm='12' style={{paddingTop: 20}}>
                <div className='d-flex justify-content-center'>
                    <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/kebijakan_dan_edukasi_halal')} outline>
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
export default DaftarBahanTable
