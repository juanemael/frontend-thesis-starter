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
import FileUploaderSingle from "../../../forms/form-elements/FileUploaderSingle";
import Upload from "../../../../models/Upload";

const DaftarBahanModal = ({setGroupID, groupID, show2, setShow2}) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaMerek, setNamaMerek] = useState("")
    const [jenisBahan,setJenisBahan] = useState("")
    const [produsen, setProdusen] = useState("")
    const [negara, setNegara] = useState("")
    const [supplier, setSupplier] = useState("")
    const [lembagaPenerbitSertHalal, setLembagaPenerbitSertHalal] = useState("")
    const [nomorSertHalal, setNomorSertHalal] = useState("")
    const [masaBerlakuSertHalal, setMasaBerlakuSertHalal] = useState("")
    const [dokumenPendukung, setDokumenPendukung] = useState("")
    const [selectedGroupID, setSelectedGroupID] = useState(null)
    const [details, setDetails] = useState([])

    const sjphKuModel = new SJPHKuModels()
    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()
    const [show, setShow] = useState(false)

    const getAllDaftarBahanByGroupID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getAllDaftarBahanByGroupID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getAllDaftarBahanByGroupID(groupID)
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
                            getAllDaftarBahanByGroupID(groupID)
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
            selector: row => {
                return (
                    row.dokumen_pendukung ? <>{<a href={row.dokumen_pendukung}>Lihat Dokumen</a>}</> : <>Kosong</>
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
    const handleUploadFile = async (event) =>{
        try {
            console.log(event.target.files[0])
            const upload = new Upload()
            const formData = new FormData()
            formData.append("upload", event.target.files[0],event.target.files[0].name)

            const result = await upload.uploadImage(formData)
            console.log(result)
            setDokumenPendukung(result.location)
            console.log(dokumenPendukung)

        } catch (e) {
            console.log(e)
        }
    }


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
            const result = await bahanKepentinganHalalModel.createDaftarBahanByGroupID(groupID,body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getAllDaftarBahanByGroupID(groupID)
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
                        <Label className='form-label' for='tanggalPersetujuan'>
                            Nama dan Merek
                        </Label>
                        <Input id='judulKegiatan' placeholder='Kegiatan'
                               onChange={(e)=>{ setNamaMerek(e.target.value) }}   />
                         </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='judulKegiatan'>
                            Jenis Bahan
                        </Label>
                        <Input id='judulKegiatan' placeholder='Kegiatan'
                               onChange={(e)=>{ setJenisBahan(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='peserta'>
                            Produsen
                        </Label>
                        <Input id='peserta' placeholder='Budi Setiawan'
                               onChange={(e)=>{ setProdusen(e.target.value) }} />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='peserta'>
                            Negara
                        </Label>
                        <Input id='peserta' placeholder='Budi Setiawan'
                               onChange={(e)=>{ setNegara(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='peserta'>
                            Supplier
                        </Label>
                        <Input id='peserta' placeholder='Budi Setiawan'
                               onChange={(e)=>{ setSupplier(e.target.value) }} />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='peserta'>
                            Lembaga Penerbit Sertifikasi Halal
                        </Label>
                        <Input id='peserta' placeholder='Budi Setiawan'
                               onChange={(e)=>{ setLembagaPenerbitSertHalal(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='peserta'>
                            Nomor Sertifikasi Halal
                        </Label>
                        <Input id='peserta' placeholder='Budi Setiawan'
                               onChange={(e)=>{ setNomorSertHalal(e.target.value) }}  />
                    </Col>
                    <Col md={6} xs={12}>
                        <Label className='form-label' for='peserta'>
                            Masa Berlaku Sertifikat Halal
                        </Label>
                        <Input id='peserta' placeholder='Budi Setiawan'
                               onChange={(e)=>{ setMasaBerlakuSertHalal(e.target.value) }}  />
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='dokumenPendukung'>
                            Dokumen Pendukung
                        </Label>
                        <Input type='file' onChange={handleUploadFile} defaultValue={dokumenPendukung} id='dokumenPendukung' name='dokumenPendukung' />
                        {/*<FileUploaderSingle  imageURL={dokumenPendukung} setImageURL={setDokumenPendukung} />*/}
                        {/*<Input id='dokumenPendukung' placeholder='Isi Nomor Sertifikasi Halal'*/}
                        {/*       onChange={(e)=>{ setDokumenPendukung(e.target.value) }} invalid={errors.peserta && true} />*/}
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

                        <Button className='me-1' color='primary' onClick={() => setShow(true)}>
                            Tambah
                        </Button>

                    </div>
                </Col>
            </ModalBody>
        </Modal>
    </Fragment>
    )
}
export default DaftarBahanModal