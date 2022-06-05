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
import CatatanPembelianBahanTable from "../../../tables/sjph/module_4/CatatanPembelianBahanTable";
import {ArrowDown, ArrowLeft, ArrowRight, ChevronDown, Edit, FileText, MoreVertical, Trash} from "react-feather";
import DataTable from "react-data-table-component";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import SJPHKuModels from "../../../../models/SJPHKu";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import moment from "moment";

const CatatanPenyimpananBahanProdukModal = ({setGroupID, groupID, show2, setShow2}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaBahan, setNamaBahan] = useState('')
    const [namaProduk, setNamaProduk] = useState('')
    const [merekProdusen, setMerekProdusen] = useState('')
    const [tanggalMasuk, setTanggalMasuk] = useState('')
    const [tanggalKeluar, setTanggalKeluar] = useState('')
    const [jumlah, setJumlah] = useState(0)
    const [penanggungJawab, setPenanggungJawab] = useState('')
    const [selectedGroupID, setSelectedGroupID] = useState(null)
    const [selfID, setSelfID] = useState(null)
    const [details, setDetails] = useState([])

    const sjphKuModel = new SJPHKuModels()
    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()
    const [show, setShow] = useState(false)

    const getAllCatatanPenyimpananBahanProdukByGroupID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getAllCatatanPenyimpananBahanProdukByGroupID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllCatatanPenyimpananBahanProdukByGroupID(groupID)
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

    const deleteCatatanPenyimpananBahanProdukBySelfID = async (id) => {
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
                    const result = await bahanKepentinganHalalModel.deleteCatatanPenyimpananBahanProdukBySelfID(id);

                    if (result.id || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getAllCatatanPenyimpananBahanProdukByGroupID(groupID)
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
            name: 'Nama Bahan',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_bahan
        },
        {
            name: 'Nama Produk',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_produk
        },
        {
            name: 'Merek dan Produsen',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.merek_dan_produsen
        },
        {
            name: 'Penanggung Jawab',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.penanggung_jawab
        },
        {
            name: 'Jumlah',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.jumlah
        },
        {
            name: 'Tanggal Masuk',
            sortable: true,
            // minWidth: '150px',
            selector: row => <>{moment(row.tanggal_masuk).format('DD-MM-YYYY')}</>
        },
        {
            name: 'Tanggal Keluar',
            sortable: true,
            // minWidth: '150px',
            selector: row => <>{moment(row.tanggal_keluar).format('DD-MM-YYYY')}</>
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
                                <DropdownItem tag='a'  className='w-100' onClick={()=>{
                                    setSelfID(row.id)
                                    setNamaBahan(row.nama_bahan)
                                    setJumlah(row.jumlah)
                                    setMerekProdusen(row.merek_dan_produsen)
                                    setTanggalMasuk(row.tanggal_masuk)
                                    setTanggalKeluar(row.tanggal_keluar)
                                    setPenanggungJawab(row.penanggung_jawab)
                                    setNamaProduk(row.nama_produk)
                                    setShow(true)
                                }}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Ubah</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{ deleteCatatanPenyimpananBahanProdukBySelfID(row.id) }}>
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
            nama_bahan: namaBahan,
            nama_produk: namaProduk,
            merek_dan_produsen: merekProdusen,
            tanggal_masuk: tanggalMasuk,
            tanggal_keluar: tanggalKeluar,
            jumlah,
            penanggung_jawab: penanggungJawab
        }
        if (selfID !== null) {
            try {
                console.log(selfID)
                const result = await bahanKepentinganHalalModel.editCatatanPenyimpananBahanProdukBySelfID(selfID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di edit','success')
                        .then(()=>{
                            getAllCatatanPenyimpananBahanProdukByGroupID(groupID)
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
                const result = await bahanKepentinganHalalModel.createCatatanPenyimpananBahanProdukByGroupID(groupID,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            getAllCatatanPenyimpananBahanProdukByGroupID(groupID)
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
        setNamaBahan("")
        setJumlah(0)
        setMerekProdusen("")
        setTanggalMasuk("")
        setTanggalKeluar("")
        setPenanggungJawab("")
        setNamaProduk("")
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
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='namaBahan'>
                            Nama Bahan
                        </Label>
                        <Input id='namaBahan'
                               defaultValue={namaBahan}
                               placeholder='Madu Alami' onChange={(e)=>{ setNamaBahan(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='namaProduk'>
                            Nama Produk
                        </Label>
                        <Input id='namaProduk'
                               defaultValue={namaProduk}
                               placeholder='Madu Asam Manis' onChange={(e)=>{ setNamaProduk(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='merekProdusen'>
                            Merek dan Produsen
                        </Label>
                        <Input id='merekProdusen'
                               defaultValue={merekProdusen}
                               placeholder='Madu Asam Manis' onChange={(e)=>{ setMerekProdusen(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='penanggungJawab'>
                            Penanggung Jawab
                        </Label>
                        <Input id='penanggungJawab'
                               defaultValue={penanggungJawab}
                               placeholder='Budi Santoso'
                               onChange={(e)=>{ setPenanggungJawab(e.target.value) }}  />
                    </Col>
                    <Col xs={12}>
                        <Label className='form-label' for='jumlah'>
                            Jumlah
                        </Label>
                        <InputGroup>
                            <Input type='number'
                                   defaultValue={jumlah}
                                   step='0.01' id='jumlah' placeholder='100' onChange={(e)=>{ setJumlah(e.target.value) }}  />
                            <InputGroupText>KG</InputGroupText>
                        </InputGroup>
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='tanggalMasuk'>
                            Tanggal Masuk
                        </Label>
                        <Flatpickr
                            // value={tanggalMasuk}
                            defaultValue={tanggalMasuk}
                            id='tanggalMasuk'
                            className='form-control'
                            onChange={date => setTanggalMasuk(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                                maxDate: {tanggalKeluar}
                            }}
                        />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='tanggalKeluar'>
                            Tanggal Keluar
                        </Label>
                        <Flatpickr
                            defaultValue={tanggalKeluar}
                            id='tanggalKeluar'
                            className='form-control'
                            onChange={date => setTanggalKeluar(date)}
                            options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'Y-m-d',
                                minDate: {tanggalMasuk}
                                // minDate: moment(tanggalMasuk).format('Y-m-d')
                            }}
                        />
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
                    <h3 className='mb-0'>Halaman 6</h3>
                    <small className='text-muted'>Catatan Penyimpanan Bahan Produk</small>
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
export default CatatanPenyimpananBahanProdukModal