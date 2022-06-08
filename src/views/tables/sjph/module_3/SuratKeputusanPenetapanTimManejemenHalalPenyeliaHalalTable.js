// ** Reactstrap Imports
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    Badge,
    Col,
    Button,
    ModalHeader,
    ModalBody,
    Row,
    Label,
    Input,
    Modal,
    Card,
    CardBody,
    CardHeader, Alert
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {useState, Fragment, useEffect} from "react";
import KebijakanEdukasiHalalModels from "../../../../models/KebijakanEdukasiHalal";
import SJPHKuModels from "../../../../models/SJPHKu";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    Edit,
    FileText,
    MoreVertical,
    Trash,
    X
} from "react-feather";
import {useForm} from "react-hook-form";


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";

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
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [posisiDiTim, setPosisiDiTim] = useState("")
    const [details,setDetails] = useState([])
    const [detailsSJPH,setDetailsSJPH] = useState([])
    const [selectedID,setSelectedID] = useState(null)


    const kebijakanEdukasiHalalModel = new KebijakanEdukasiHalalModels()
    const sjphKuModel = new SJPHKuModels()

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
                    item.nama.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.modified_at.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.nama.toLowerCase().startsWith(value.toLowerCase()) ||
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
    const getSJPHInfo= async (id) => {
        try {
            const result = await sjphKuModel.getSelectedSJPH(id)
            console.log(result)
            setDetailsSJPH(result)
        } catch (e) {
            console.error(e)
        }
    }
    const deleteSuratKeputusanPTMP = async (id) => {
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
                    const result = await kebijakanEdukasiHalalModel.deleteSuratKeputusanBySelfID(id);

                    if (result.id || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getSuratKeputusanBySJPHID(sessionStorage.sjph_id)
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
        })
    }

    const submit = async () => {
        const body = {
            nama,
            jabatan,
            posisi_di_tim: posisiDiTim
        }
        if (selectedID !== null) {
            try {
                const result = await kebijakanEdukasiHalalModel.editSuratKeputusanBySelfID(selectedID,body)
                if ((result.id)||(result.success)||(result)) {
                    await swal.fire('','Data berhasil di edit','success')
                        .then(()=>{
                            setTempatPersetujuan(result.tempat_persetujuan_catatan_pembelian_halal)
                            setTanggalPersetujuan(result.tanggal_persetujuan_catatan_pembelian_halal)
                            setNama(result.nama)
                            getSuratKeputusanBySJPHID(sessionStorage.sjph_id)
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
    }

    const submitTempatTanggal = async () => {
        const body = {
            tempat_persetujuan_surat_keputusan_ptmp_halal: tempatPersetujuan,
            tanggal_persetujuan_surat_keputusan_ptmp_halal: tanggalPersetujuan
        }
        try {
            const result = await sjphKuModel.editTempatTanggalKeputusanSJPH(sessionStorage.sjph_id,body)
            if ((result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getSJPHInfo(sessionStorage.sjph_id)
                    })
            } else {
                await swal.fire('','Data gagal disimpan', 'error')
            }
        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }
    const columns = [
        {
            name: 'ID',
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
            selector: (row) => {
                return (<Badge color='light-success' pill>
                    {row.jabatan}
                </Badge>)

            }
        },

        {
            name: 'Posisi di Tim',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.posisi_di_tim
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
                                <DropdownItem tag='a' className='w-100' onClick={()=>{
                                    setSelectedID(row.id)
                                    setNama(row.nama)
                                    setJabatan(row.jabatan)
                                    setPosisiDiTim(row.posisi_di_tim)
                                    setShow(true)
                                }}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Ubah</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{ deleteSuratKeputusanPTMP(row.id) }}>
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

    useEffect(()=>{
        getSuratKeputusanBySJPHID(sessionStorage.sjph_id)
        getSJPHInfo(sessionStorage.sjph_id)
    },[])

    const reset = async () => {
        setNama("")
        setJabatan("")
        setPosisiDiTim("")
    }
    return (
        <Fragment>
            <Modal isOpen={show} toggle={() => {
                setSelectedID(null)
                setShow(!show)
            }} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => {
                    setSelectedID(null)
                    setShow(!show)
                }}></ModalHeader>
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
                                defaultValue={nama}
                                onChange={(e)=>{ setNama(e.target.value) }}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='jabatan'>
                                Jabatan
                            </Label>
                            <Input id='jabatan' placeholder='Pimpinan Perusahaan/CEO/CTO'
                                   defaultValue={jabatan}
                                   onChange={(e)=>{ setJabatan(e.target.value) }}  />

                             </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='posisi_di_tim'>
                                Posisi Di Tim
                            </Label>
                            <Input id='posisi_di_tim' placeholder='Ketua/Anggota'
                                   onChange={(e)=>{ setPosisiDiTim(e.target.value) }}
                                   defaultValue={posisiDiTim}/>
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
                <h3 className='mb-0'>Wisata 1</h3>
                <small className='text-muted'>Surat Keputusan Penetapan Tim Manajemen Halal Dan/Atau Penyelia Halal</small>
            </div>
            <Card>
                <CardHeader>
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <AlertCircle id={'infoPersetujuan'}/> Isi tempat dan tanggal persetujuan*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<UncontrolledTooltip placement='top' target='infoPersetujuan'>*/}
                    {/*    Isi tempat dan tanggal persetujuan kamu. Kamu bisa mengganti tanggal dan tempat sesuai waktu dan tempat pengisian.*/}
                    {/*</UncontrolledTooltip>*/}
                    <div>
                    <h4>Isi Tempat Dan Tanggal Persetujuan</h4>
                    <Alert color='info'>
                        <div className='alert-body'>
                            Info: Kamu bisa mengganti tanggal dan tempat sesuai waktu dan tempat pengisian.
                        </div>
                    </Alert>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tanggalPersetujuan'>
                                Tempat Persetujuan
                            </Label>
                            <Input id='tanggalPersetujuan' defaultValue={detailsSJPH.sjph_id && detailsSJPH.tempat_persetujuan_surat_keputusan_ptmp_halal} placeholder='Tempat Isi Persetujuan (Cth: Jakarta)'
                                   onChange={(e)=>{ setTempatPersetujuan(e.target.value) }}  />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tempatPersetujuan'>
                                Tanggal Persetujuan
                            </Label>
                            <Flatpickr
                                value={detailsSJPH.sjph_id && detailsSJPH.tanggal_persetujuan_surat_keputusan_ptmp_halal}
                                id='tanggal'
                                className='form-control'
                                onChange={date => setTanggalPersetujuan(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    defaultDate: "today",
                                    dateFormat: 'Y-m-d',
                                }}
                            />
                        </Col>
                        &nbsp;
                        <Col sm='12'>
                            <div className='d-flex justify-content-center'>
                                <Button onClick={submitTempatTanggal} className='me-1' color='success'>
                                    Simpan
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <div className='divider divider-dashed'>
                <div className='divider-text'>Tabel Data <ArrowDown size={15} /></div>
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
                    <Button className='me-1' color='success' onClick={() => {
                        reset().then(r =>setShow(true))
                    }}>
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
