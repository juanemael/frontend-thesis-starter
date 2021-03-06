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
import {ArrowLeft, ArrowRight, Check, ChevronDown, Edit, FileText, MoreVertical, Trash, X} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";

import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import moment from "moment";

const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
}
const MediaKomunikasiTable = ({stepper , setCheckpoint}) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tanggalSosialisasi, setTanggalSosialisasi] = useState(new Date())
    const [judulKegiatan, setJudulKegiatan] = useState("")
    const [peserta, setPeserta] = useState("")
    const [mediaKomunikasi, setMediaKomunikasi] = useState([])
    const [details, setDetails] = useState([])
    const [selfID, setSelfID] = useState(null)

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

    const getMediaKomunikasiAll = async () => {
        try {
            const result = await kriteriaSJPHKebijakanHalalModel.getMediaKomunikasiAll()
            setMediaKomunikasi(result)
        } catch (e) {
            console.error(e)
        }
    }
    const getAllMediaKomunikasiBySJPHID = async (id) => {
        try {
            const result = await kriteriaSJPHKebijakanHalalModel.getAllMediaKomunikasiBySJPHID(id)
            setMediaKomunikasi(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllMediaKomunikasiBySJPHID(sessionStorage.sjph_id)
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
            updatedData = mediaKomunikasi.filter(item => {
                const startsWith =
                    item.judul_kegiatan.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.nama_perusahaan.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.peserta.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.judul_kegiatan.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.nama_perusahaan.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.peserta.toLowerCase().startsWith(value.toLowerCase())

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
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(mediaKomunikasi.length / 7) || 1}
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

    const deleteMediaKomunikasiBySelfID = async (id) => {
        swal.fire({
            title: "Peringatan!",
            text: "Apakah kamu yakin ingin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButton: "Iya, tentu saja",
            cancelButton: "Tidak",
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ms-1'
            },
            buttonsStyling: false
            // dangerMode: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    const result = await kriteriaSJPHKebijakanHalalModel.deleteMediaKomunikasiBySelfID(id);

                    if (result.id || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getAllMediaKomunikasiBySJPHID(sessionStorage.sjph_id)
                        })
                    } else {
                        await Swal.fire({
                            title: 'Failed',
                            text: 'Failed to delete',
                            icon: 'error',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }})
                    }
                } catch (e) {
                    console.error(e)
                    await Swal.fire('', e.error_message ? e.error_message : "Something Wrong", 'error')
                }
            }
            setSelfID(null)
        })
    }

    const columns = [
        {
            name: 'ID',
            // minWidth: '150px',
            selector: row => row.id,
            sortable: row => row.id
        },
        {
            name: 'Tanggal Sosialisasi',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.tanggal_sosialisasi
        },
        {
            name: 'Judul Kegiatan',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.judul_kegiatan
        },

        {
            name: 'Peserta',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.peserta
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
                                <DropdownItem tag='a' className='w-100' onClick={() =>{
                                    setSelfID(row.id)
                                    setPeserta(row.peserta)
                                    setJudulKegiatan(row.judul_kegiatan)
                                    console.log("LOLO", peserta)
                                    setTanggalSosialisasi(row.tanggal_sosialisasi)
                                    setShow(true) 
                                }}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Ubah</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{
                                    setSelfID(row.id)
                                    deleteMediaKomunikasiBySelfID(row.id)
                                }}>
                                    <Trash size={15} />
                                    <span className='align-middle ms-50'>Hapus</span>
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
            tanggal_sosialisasi: tanggalSosialisasi ? tanggalSosialisasi : details.tanggal_sosialisasi,
            judul_kegiatan: judulKegiatan ? judulKegiatan : details.judul_kegiatan,
            peserta: peserta? peserta : details.peserta
        }
        if (selfID !== null) {
            try {
                const result = await kriteriaSJPHKebijakanHalalModel.editMediaKomunikasiBySelfID(selfID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di edit','success')
                        .then(()=>{
                            getAllMediaKomunikasiBySJPHID(sessionStorage.sjph_id)
                            setShow(false)
                        })
                } else {
                    await swal.fire('','Data gagal disimpan', 'error')
                }
            } catch (e) {
                console.error(e)
                await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
            }
        } else {
            try {
                const result = await kriteriaSJPHKebijakanHalalModel.createMediaKomunikasi(sessionStorage.sjph_id,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            getAllMediaKomunikasiBySJPHID(sessionStorage.sjph_id)
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
        setSelfID(null)
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
                                Tanggal Sosialisasi
                            </Label>
                            <Flatpickr
                                value={tanggalSosialisasi}
                                // defaultValue={cont}
                                id='tanggalPersetujuan'
                                className='form-control'
                                onChange={date => setTanggalSosialisasi(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    dateFormat: 'Y-m-d',
                                }}
                            />
                            {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='judulKegiatan'>
                                Judul Kegiatan
                            </Label>
                            <Input id='judulKegiatan' placeholder='Kegiatan' defaultValue={judulKegiatan} onChange={(e)=>{ setJudulKegiatan(e.target.value) }}  />
                            {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                        </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='peserta'>
                                Peserta
                            </Label>
                            <Input id='peserta' placeholder='Budi Setiawan' defaultValue={peserta} onChange={(e)=>{ setPeserta(e.target.value) }} />
                            {errors.username && <FormFeedback>Please enter a valid Username</FormFeedback>}
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button onClick={submit} className='me-1' color='success'>
                                Simpan
                            </Button>
                            <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                                Kembali
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <div className='content-header'>
                <h3 className='mb-0'>Wisata 2</h3>
                <small className='text-muted'>Tabel media komunikasi-mu</small>
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
                    data={searchValue.length ? filteredData : mediaKomunikasi}
                    // selectableRowsComponent={BootstrapCheckbox}
                />
            </div>
            &nbsp;
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
                    <Button className='me-1' color='success' onClick={()=> setShow(true)}>
                        {/*<Button className='me-1' color='primary' onClick={()=>setProgressValue(100)}>*/}
                        Tambah
                    </Button>
                    <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/kebijakan_dan_edukasi_halal')}>
                        <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
                {/*<div className='d-flex justify-content-end'>*/}
                {/*    <Button className='me-1' color='primary' onClick={()=> setShow(true)}>*/}
                {/*        Tambah*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </Col>
        </Fragment>
    )

}
export default MediaKomunikasiTable
