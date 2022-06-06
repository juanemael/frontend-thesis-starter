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
    Row, Label, Input, FormFeedback, Modal, Card, CardHeader, Alert, CardBody
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment, useEffect, forwardRef} from "react";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronDown,
    Edit,
    FileText,
    MoreVertical,
    Trash,
    X
} from "react-feather";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import SJPHKuModels from "../../../../models/SJPHKu";

const defaultValues = {
    firstName: 'Bob',
    lastName: 'Barton',
    username: 'bob.dev'
}

const SuratPermohonanPersetujuanPenggunaanBahanBaruTable = ({stepper, getSJPHInfo,  detailsSJPH, setCheckpoint}) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [namaBahan, setNamaBahan] = useState("")
    const [merek, setMerek] = useState("")
    const [produsen, setProdusen] = useState("")
    const [nomorSH, setNomorSH] = useState("")
    const [masaBerlakuSertHalal, setMasaBerlakuSertHalal] = useState("")
    const [details, setDetails] = useState([])
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [selectedID,setSelectedID] = useState(null)

    const sjphKuModel = new SJPHKuModels()


    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()

    const navigate = useNavigate()

    // ** States
    const [show, setShow] = useState(false)

    const getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(()=>{
        getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID(sessionStorage.sjph_id)
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
                    item.nama_bahan.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.merek.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.produsen.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.nama_bahan.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.merek.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.produsen.toLowerCase().startsWith(value.toLowerCase())

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

    const deleteSuratPermohonanPersetujuanPenggunaanBahanBaru = async (id) => {
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
                    const result = await bahanKepentinganHalalModel.deleteSuratPermohonanPersetujuanPenggunaanBahanBaruBySelfID(id);

                    if (result.id || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID(sessionStorage.sjph_id)
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
            name: 'Merek',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.merek
        },
        {
            name: 'Produsen',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.produsen
        },
        {
            name: 'Nomor SH',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nomor_sh
        },
        {
            name: 'Masa Berlaku Sert. Halal',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.masa_berlaku_sert_halal
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
                                    setNamaBahan(row.nama_bahan)
                                    setMerek(row.merek)
                                    setProdusen(row.produsen)
                                    setNomorSH(row.nomor_sh)
                                    setMasaBerlakuSertHalal(row.masa_berlaku_sert_halal)
                                    setShow(true)
                                }}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Ubah</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{ deleteSuratPermohonanPersetujuanPenggunaanBahanBaru(row.id) }}>
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
            merek,
            produsen,
            nomor_sh: nomorSH,
            masa_berlaku_sert_halal: masaBerlakuSertHalal
        }
        if (selectedID !== null) {
            try {
                const result = await bahanKepentinganHalalModel.editSuratPermohonanPersetujuanPenggunaanBahanBaruBySelfID(selectedID,body)
                if ((result.id)||(result.success)||(result)) {
                    await swal.fire('','Data berhasil di edit','success')
                        .then(()=>{
                            getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID(sessionStorage.sjph_id)
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
                const result = await bahanKepentinganHalalModel.createSuratPermohonanPersetujuanPenggunaanBahanBaru(sessionStorage.sjph_id,body)
                if ((result.id)||(result.success)) {
                    await swal.fire('','Data berhasil di simpan','success')
                        .then(()=>{
                            getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID(sessionStorage.sjph_id)
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

    const submitTempatTanggal = async () => {
        const body = {
            tempat_persetujuan_surat_permohonan_persetujuan_barang_baru: tempatPersetujuan? tempatPersetujuan : detailsSJPH.tempat_persetujuan_surat_permohonan_persetujuan_barang_baru,
            tanggal_persetujuan_surat_permohonan_persetujuan_barang_baru: tanggalPersetujuan? tanggalPersetujuan : detailsSJPH.tanggal_persetujuan_surat_permohonan_persetujuan_barang_baru
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

    const reset = async () => {
        setSelectedID(null)
        setNamaBahan("")
        setProdusen("")
        setMerek("")
        setNomorSH("")
        setMerek("")
        setMasaBerlakuSertHalal("")
    }

    return (
        <Fragment>
            <div className='content-header'>
                <h3 className='mb-0'>Wisata 7</h3>
                <small className='text-muted'>Surat Permohonan Persetujuan Penggunaan Bahan Baru</small>
            </div>

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
                        <Col xs={12}>
                            <Label className='form-label' for='peserta'>
                                Nama Bahan
                            </Label>
                            <Input id='peserta'
                                   defaultValue={namaBahan}
                                   placeholder='Gandum' onChange={(e)=>{ setNamaBahan(e.target.value) }} />
                            </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='merek'>
                                Merek
                            </Label>
                            <Input id='merek'
                                   defaultValue={merek}
                                   placeholder='Segitiga Biru' onChange={(e)=>{ setMerek(e.target.value) }}  />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='produsen'>
                                Produsen
                            </Label>
                            <Input id='produsen'
                                   defaultValue={produsen}
                                   placeholder='PT. Contohkarya' onChange={(e)=>{ setProdusen(e.target.value) }} />

                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tanggalDatangBeli'>
                                Nomor Sertifikat Halal
                            </Label>
                            <Input id='tanggalDatangBeli'
                                   defaultValue={nomorSH}
                                   placeholder='106515165' onChange={(e)=>{ setNomorSH(e.target.value) }}  />

                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tanggalPersetujuan'>
                                Masa Berlaku Sertifikasi Halal
                            </Label>
                            <Flatpickr
                                // value={tanggalSosialisasi}
                                defaultValue={masaBerlakuSertHalal}
                                id='tanggalPersetujuan'
                                className='form-control'
                                onChange={date => setMasaBerlakuSertHalal(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    dateFormat: 'Y-m-d',
                                }}
                            />
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button onClick={submit} className='me-1' color='primary'>
                                Submit
                            </Button>
                            <Button type='reset' color='secondary' outlineonClick={() => {
                                reset().then(r =>setShow(true))
                            }}>
                                Kembali
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
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
                            <Input id='tanggalPersetujuan' defaultValue={detailsSJPH.sjph_id && detailsSJPH.tempat_persetujuan_surat_permohonan_persetujuan_barang_baru} placeholder='Isi Kota untuk Tempat Persetujuan (Cth: Jakarta)'
                                   onChange={(e)=>{ setTempatPersetujuan(e.target.value) }}  />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tempatPersetujuan'>
                                Tanggal Persetujuan
                            </Label>
                            <Flatpickr
                                value={detailsSJPH.sjph_id && detailsSJPH.tanggal_persetujuan_surat_permohonan_persetujuan_barang_baru}
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
                                <Button onClick={submitTempatTanggal} className='me-1' color='primary'>
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
                        setCheckpoint(5)
                    }} outline>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                    </Button>
                    <Button className='me-1' color='primary' onClick={() => {
                        reset().then(r =>setShow(true))
                    }}>
                        Tambah
                    </Button>
                    <Button className='me-1' color='primary' onClick={()=>navigate('/sjph/kepentingan_produksi_dan_distribusi_produk')}>
                        <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
            </Col>
        </Fragment>
    )

}
export default SuratPermohonanPersetujuanPenggunaanBahanBaruTable
