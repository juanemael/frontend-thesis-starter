import {
    Alert,
    Button,
    Card, CardBody,
    CardHeader,
    Col, DropdownItem, DropdownMenu, DropdownToggle,
    FormFeedback,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row, UncontrolledDropdown
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import {useState, Fragment, useEffect, forwardRef} from "react";
import CatatanPembelianBahanTable from "../../../tables/sjph/module_4/CatatanPembelianBahanTable";
import {ArrowDown, ArrowLeft, ArrowRight, ChevronDown, Edit, FileText, MoreVertical, Trash} from "react-feather";
import DataTable from "react-data-table-component";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import SJPHKuModels from "../../../../models/SJPHKu";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";

const CatatanPembelianBahanModal = ({setGroupID, groupID, show2, setShow2}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaMerek, setNamaMerek] = useState("")
    const [jumlah, setJumlah] = useState("")
    const [tanggalPembelian, setTanggalPembelian] = useState("")
    const [selectedGroupID, setSelectedGroupID] = useState(null)
    const [details, setDetails] = useState([])

    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()
    const [show, setShow] = useState(false)
    const getAllCatatanPembelianBahanByGroupID = async (id) => {
        try {
            console.log(id)
            const result = await bahanKepentinganHalalModel.getAllCatatanPembelianBahanByGroupID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllCatatanPembelianBahanByGroupID(groupID)
    },[groupID])


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
                    item.nama_dan_merek.toLowerCase().startsWith(value.toLowerCase()) ||
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
                    const result = await bahanKepentinganHalalModel.deleteMediaKomunikasi(id);

                    if (result.id || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getAllCatatanPembelianBahanByGroupID(groupID)
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

    const columns = [
        {
            name: 'ID',
            // minWidth: '150px',
            selector: row => row.id,
            sortable: row => row.id
        },
        {
            name: 'Nama Bahan - Merk Bahan',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_dan_merek
        },
        {
            name: 'Jumlah',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.jumlah
        },
        {
            name: 'Waktu Pembelian',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.tanggal_pembelian
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
            jumlah,
            tanggal_pembelian: tanggalPembelian,
        }
        try {
            // if (setSelectedGroupID !== null) {
            //     console.log(groupID)
            //     const result = await bahanKepentinganHalalModel.editCatatanPembelianGroup(groupID,body)
            //     if ((result.id)||(result.success)) {
            //         await swal.fire('','Data berhasil di edit','success')
            //             .then(()=>{
            //                 getCatatanPembelianBahanByGroupID(groupID)
            //                 setShow(false)
            //             })
            //     } else {
            //         await swal.fire('','Data gagal disimpan', 'error')
            //     }
            // } else {
                const result = await bahanKepentinganHalalModel.createCatatanPembelianBahanByGroupID(groupID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            getAllCatatanPembelianBahanByGroupID(groupID)
                            setShow(false)
                        })
                } else {
                    await swal.fire('','Data gagal disimpan', 'error')
                }
            // }

        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }
return (
    <Fragment>
        <Modal isOpen={show} toggle={() =>{
            setShow(!show)
            setGroupID(null)
        }} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={() =>{
                setShow(!show)
                setGroupID(null)
            }}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Tambah Data Tabel</h1>
                    <p>Tambah data tabelmu sekarang</p>
                </div>
                <Row tag='form' className='gy-1 pt-75' >
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='tanggalPembelian'>
                            Tanggal Pembelian
                        </Label>
                        <Flatpickr
                            value={details.id && details.tanggal_pembelian}
                            defaultValue={details.id && details.tanggal_pembelian}
                            id='tanggalPembelian'
                            className='form-control'
                            onChange={date => setTanggalPembelian(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                            }}
                        />
                        </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='namaMerek'>
                            Nama dan Merek
                        </Label>
                        <Input id='namaMerek' placeholder='Kegiatan' onChange={(e)=>{ setNamaMerek(e.target.value) }} />
                        </Col>
                    <Col xs={12}>
                        <Label className='form-label' for='jumlah'>
                            Jumlah
                        </Label>
                        <Input id='jumlah' placeholder='(Dalam KG)' onChange={(e)=>{ setJumlah(e.target.value) }} />
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
        <Modal isOpen={show2} toggle={() =>{
            setShow2(!show2)
            setGroupID(null)
        }} className='modal-dialog-centered modal-xl'>
            <ModalHeader className='bg-transparent'  toggle={() =>{
                setShow2(!show2)
                setGroupID(null)
            }}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='content-header'>
                    <h3 className='mb-0'>Halaman 3</h3>
                    <small className='text-muted'>Catatan Pembelian Bahan</small>
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
                <div className={'react-dataTable'}>
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
                &nbsp;
                <Col sm='12'>
                    <div className='d-flex justify-content-center'>
                        <Button className='me-1 ms-1' color='primary' onClick={() => {
                            stepper.previous()
                            setCheckpoint(1)
                        }} outline>
                            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                            <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                        </Button>
                        <Button className='me-1' color='primary' onClick={() => setShow(true)}>
                            Tambah
                        </Button>
                        <Button className='me-1' color='primary' onClick={()=>{
                            stepper.next()
                            setCheckpoint(3)
                        }}>
                            <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                        </Button>
                    </div>
                </Col>
            </ModalBody>
        </Modal>
    </Fragment>
    )
}
export default CatatanPembelianBahanModal