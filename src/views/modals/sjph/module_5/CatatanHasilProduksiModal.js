import {
    Alert,
    Button,
    Card, CardBody,
    CardHeader,
    Col, DropdownItem, DropdownMenu, DropdownToggle,
    FormFeedback,
    Input, InputGroup, InputGroupText,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row, UncontrolledDropdown
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import {useState, Fragment, useEffect, forwardRef} from "react";
import {ArrowDown, ArrowLeft, ArrowRight, ChevronDown, Edit, FileText, MoreVertical, Trash} from "react-feather";
import DataTable from "react-data-table-component";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import moment from "moment";
import KepentinganProduksiDistribusiProdukModels from "../../../../models/KepentinganProduksiDistribusiProduk";

const CatatanHasilProduksiModal = ({setGroupID, groupID, show2, setShow2}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaVarianMerekProduk, setNamaVarianMerekProduk] = useState("")
    const [jumlah, setJumlah] = useState(0)
    const [tanggal, setTanggal] = useState(0)
    const [keterangan, setKeterangan] = useState("")
    const [details, setDetails] = useState([])
    const [selfID, setSelfID] = useState(null)

    const kepentinganProduksiDistribusiProdukModel = new KepentinganProduksiDistribusiProdukModels()
    const [show, setShow] = useState(false)

    const getAllCatatanHasilProduksiByGroupID = async (id) => {
        try {
            const result = await kepentinganProduksiDistribusiProdukModel.getAllCatatanHasilProduksiByGroupID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllCatatanHasilProduksiByGroupID(groupID)
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
                    item.nama_varian_merek_produk.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.jumlah.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.keterangan.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.nama_varian_merek_produk.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.jumlah.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.keterangan.toLowerCase().startsWith(value.toLowerCase())

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

    const deleteCatatanHasilProduksiBySelfID = async (id) => {
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
                    const result = await kepentinganProduksiDistribusiProdukModel.deleteCatatanHasilProduksiBySelfID(id);
                    if (result || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getAllCatatanHasilProduksiByGroupID(groupID)
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
            name: 'Tanggal',
            sortable: true,
            // minWidth: '150px',
            selector: row => <>{moment(row.tanggal).format('DD-MM-YYYY')}</>
            // {
            //     const date = new Date(row.tanggal.toString())
            //     date.toString()
            //     return date
            // }
        },
        {
            name: 'Nama Produk/Varian/Merek',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_varian_merek_produk
        },
        {
            name: 'Jumlah',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.jumlah
        },
        {
            name: 'Keterangan',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.keterangan
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
                            <DropdownMenu className={'position-fixed'} end>
                                <DropdownItem tag='a' className='w-100' onClick={()=>{
                                    setSelfID(row.id)
                                    setNamaVarianMerekProduk(row.nama_varian_merek_produk)
                                    setTanggal(row.tanggal)
                                    setJumlah(row.jumlah)
                                    setKeterangan(row.keterangan)
                                    setShow(true)
                                }}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Ubah</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{ deleteCatatanHasilProduksiBySelfID(row.id) }}>
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
            nama_varian_merek_produk: namaVarianMerekProduk,
            tanggal,
            jumlah,
            keterangan
        }
        if (selfID !== null) {
            try {
                const result = await kepentinganProduksiDistribusiProdukModel.editCatatanHasilProduksiBySelfID(selfID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di edit','success')
                        .then(()=>{
                            getAllCatatanHasilProduksiByGroupID(groupID)
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
                const result = await kepentinganProduksiDistribusiProdukModel.createCatatanHasilProduksiByGroupID(groupID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            getAllCatatanHasilProduksiByGroupID(groupID)
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

    }
    const reset = async () => {
        setSelfID(null)
        setNamaVarianMerekProduk(null)
        setTanggal(null)
        setJumlah(null)
        setKeterangan(null)
    }


    return (
    <Fragment>
        <Modal isOpen={show} toggle={() =>{
            setShow(!show)
        }} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={() =>{
                setShow(!show)
            }}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Tambah Data Tabel</h1>
                    <p>Tambah data tabelmu sekarang</p>
                </div>
                <Row tag='form' className='gy-1 pt-75' >
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='namaVarianMerekProduk'>
                            Nama Produk/Varian/Merek
                        </Label>
                        <Input id='namaVarianMerekProduk'
                               defaultValue={namaVarianMerekProduk}
                               placeholder='Keripik JOS/Keripik Kentang/Tiga Roda' onChange={(e)=>{ setNamaVarianMerekProduk(e.target.value) }} />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='tanggal'>
                            Tanggal
                        </Label>
                        <Flatpickr
                            // value={tanggalSosialisasi}
                            defaultValue={tanggal}
                            id='tanggal'
                            className='form-control'
                            onChange={date => setTanggal(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                            }}
                        />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='jumlah'>
                            Jumlah
                        </Label>
                        <InputGroup>
                            <Input type='number'
                                   defaultValue={jumlah}
                                   step='0.01' id='jumlah' placeholder='10,5' onChange={(e)=>{ setJumlah(e.target.value) }}  />
                            <InputGroupText>KG</InputGroupText>
                        </InputGroup></Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='keterangan'>
                            Keterangan
                        </Label>
                        <Input id='keterangan'
                               defaultValue={keterangan}
                               placeholder='keterangan' onChange={(e)=>{ setKeterangan(e.target.value) }}  />
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
            <ModalHeader className='bg-transparent' toggle={() =>{
                setShow2(!show2)
                setGroupID(null)
            }}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='content-header'>
                    <h3 className='mb-0'>Wisata 3</h3>
                    <small className='text-muted'>Catatan Hasil Produksi</small>
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
                        <Button className='me-1' color='primary' onClick={() => {
                            reset().then(r =>setShow(true))
                        }}>
                            Tambah
                        </Button>
                    </div>
                </Col>
            </ModalBody>
        </Modal>
    </Fragment>
    )
}
export default CatatanHasilProduksiModal