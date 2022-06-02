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
    Row, Label, Input, FormFeedback, Modal, CardHeader, Alert, CardBody, Card
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment, useEffect, forwardRef} from "react";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight, ArrowUp,
    Check,
    ChevronDown,
    Edit,
    FileText,
    MoreVertical,
    Trash,
    X
} from "react-feather";
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
import SJPHKuModels from "../../../../models/SJPHKu";
import DaftarBahanModal from "../../../modals/sjph/module_4/DaftarBahanModal";

const DaftarBahanTable = ({stepper, getSJPHInfo, setCheckpoint,detailsSJPH}) => {

    const [currentPageGroup, setCurrentPageGroup] = useState(0)
    const [searchValueGroup, setSearchValueGroup] = useState('')
    const [filteredDataGroup, setFilteredDataGroup] = useState([])
    const [nama, setNama] = useState("")
    const [groupID, setGroupID] = useState(null)
    const [details, setDetails] = useState([])
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")

    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()

    const navigate = useNavigate()

    // ** States
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    const getDaftarBahanAll = async () => {
        try {
            const result = await bahanKepentinganHalalModel.getDaftarBahanAll()
            // setMediaKomunikasi(result)
        } catch (e) {
            console.error(e)
        }
    }

    const getAllDaftarBahanGroupBySJPHID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getAllDaftarBahanGroupBySJPHID(id)
            setDetails(result)
            console.log("TES", result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllDaftarBahanGroupBySJPHID(sessionStorage.sjph_id)
    },[])

    const handlePaginationGroup = page => {
        setCurrentPageGroup(page.selected)
    }

    const handleFilterGroup = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValueGroup(value)

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
                    item.nama_dan_merek.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.modified_at.toLowerCase().startsWith(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredDataGroup(updatedData)
            setSearchValueGroup(value)
        }
    }

    const CustomPaginationGroup = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPageGroup}
            onPageChange={page => handlePaginationGroup(page)}
            pageCount={searchValueGroup.length ? Math.ceil(filteredDataGroup.length / 7) : Math.ceil(details.length / 7) || 1}
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
    const columnsGroup = [
        {
            name: 'ID',
            // minWidth: '150px',
            selector: row => row.id,
            sortable: row => row.id
        },
        {
            name: 'Nama Dokumen',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama
        },
        {
            name:  'Konten Isi',
            cell:  (row) => {
                return (
                    <Button className='me-1'
                            color='primary' id='buttonLihat'
                            onClick={()=>{
                                setGroupID(row.id)
                                setShow2(true)
                            }}>
                        Isi Tabel
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
                            <DropdownToggle className='cursor-pointer pe-1' tag='span' >
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu container={'body'} end>
                                <DropdownItem tag='a' className='w-100' onClick={() =>{
                                    setGroupID(row.id)
                                    setNama(row.nama)
                                    setTanggalPersetujuan(row.tanggal_persetujuan_daftar_bahan)
                                    console.log(tanggalPersetujuan)
                                    setTempatPersetujuan(row.tempat_persetujuan_daftar_bahan)
                                    console.log(tempatPersetujuan)
                                    setShow(true)
                                }}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Edit</span>
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
            nama: nama? nama : details.nama,
            tempat_persetujuan_daftar_bahan: tempatPersetujuan? tempatPersetujuan : details.tempat_persetujuan_daftar_bahan,
            tanggal_persetujuan_daftar_bahan: tanggalPersetujuan? tanggalPersetujuan : details.tanggal_persetujuan_daftar_bahan
        }
        console.log("INI BODY GROUP", body)
        if (groupID !== null) {
            try {
                const result = await bahanKepentinganHalalModel.editDaftarBahanGroupByGroupID(groupID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di edit','success')
                        .then(()=>{
                            setTempatPersetujuan(result.tempat_persetujuan_daftar_bahan)
                            setTanggalPersetujuan(result.tanggal_persetujuan_daftar_bahan)
                            setNama(result.nama)
                            getAllDaftarBahanGroupBySJPHID(sessionStorage.sjph_id)
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
                const result = await bahanKepentinganHalalModel.createDaftarBahanGroupBySJPHID(sessionStorage.sjph_id,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            getAllDaftarBahanGroupBySJPHID(sessionStorage.sjph_id)
                            setShow(false)
                            setTanggalPersetujuan("")
                            setNama("")
                            setTempatPersetujuan("")
                        })
                } else {
                    await swal.fire('','Data gagal disimpan', 'error')
                }
            } catch (e) {
                console.error(e)
                await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
            }

        }
        setGroupID(null)
    }
    const submitTempatTanggal = async () => {
        const body = {
            tempat_persetujuan_daftar_bahan: tempatPersetujuan? tempatPersetujuan: detailsSJPH.tempat_persetujuan_daftar_bahan,
            tanggal_persetujuan_daftar_bahan: tanggalPersetujuan? tanggalPersetujuan: detailsSJPH.tanggal_persetujuan_daftar_bahan
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

    return (
        <Fragment>
            <DaftarBahanModal setGroupID={setGroupID} groupID={groupID} detailsSJPH={detailsSJPH} setShow2={setShow2} show2={show2} />
            <div className='content-header'>
                <h3 className='mb-0'>Halaman 1</h3>
                <small className='text-muted'>Daftar Bahan</small>
            </div>
            <Modal isOpen={show} toggle={() => {
                setGroupID(null)
                setShow(!show)
            }} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => {
                    setGroupID(null)
                    setShow(!show)
                }}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>Tambah Data Tabel</h1>
                        <p>Tambah data tabelmu sekarang</p>
                    </div>
                    <Card>
                        <CardHeader>
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
                                    <Input id='tanggalPersetujuan' defaultValue={tempatPersetujuan} placeholder='Isi Kota untuk Tempat Persetujuan (Cth: Jakarta)'
                                           onChange={(e)=>{ setTempatPersetujuan(e.target.value) }}  />
                                </Col>
                                <Col md={6} xs={12}>
                                    <Label className='form-label' for='tempatPersetujuan'>
                                        Tanggal Persetujuan
                                    </Label>
                                    <Flatpickr
                                        value={tanggalPersetujuan}
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
                            </Row>
                        </CardBody>
                    </Card>
                    <div className='divider divider-dashed'>
                        <div className='divider-text'>Tabel Data <ArrowDown size={15} /></div>
                    </div>
                    <Row tag='form' className='gy-1 pt-75' >
                        <Col md={12} xs={12}>
                            <Label className='form-label' for='nama'>
                                Nama Tabel Catatan Penyimpanan Bahan dan Produk
                            </Label>
                            <Input id='nama' defaultValue={nama} placeholder='Tabel Catatan Penyimpanan Bahan dan Produk Juni 2022'
                                   onChange={(e)=>{ setNama(e.target.value) }} />
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
                        value={searchValueGroup}
                        onChange={handleFilterGroup}
                    />
                </Col>
            </Row>
            <div className={'react-dataTable'}>
                <DataTable
                    noHeader
                    pagination
                    // selectableRows
                    columns={columnsGroup}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPageGroup + 1}
                    paginationComponent={CustomPaginationGroup}
                    data={searchValueGroup.length ? filteredDataGroup : details}
                    // selectableRowsComponent={BootstrapCheckbox}
                />
            </div>
            &nbsp;
            <Col sm='12'>
                <div className='d-flex justify-content-center'>
                    <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/kebijakan_dan_edukasi_halal')} outline>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                    </Button>
                    <Button className='me-1' color='primary' onClick={()=> setShow(true)}>
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
            <div className='divider divider-dashed'>
                <div className='divider-text'>Tabel Data <ArrowUp size={15} /></div>
            </div>

        </Fragment>
    )

}
export default DaftarBahanTable
