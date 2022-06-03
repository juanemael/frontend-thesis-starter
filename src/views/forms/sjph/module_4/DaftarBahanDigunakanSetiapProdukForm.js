// ** Reactstrap Imports
import {
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    Card,
    CardHeader,
    Alert,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment, useEffect} from "react";
import BahanKepentinganHalalModels from "../../../../models/BahanKepentinganHalal";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import { selectThemeColors } from '@utils'
import makeAnimated from 'react-select/animated'
import {ArrowDown, ArrowLeft, ArrowRight, ChevronDown, Edit, FileText, MoreVertical, Trash} from "react-feather";
import Flatpickr from "react-flatpickr";
import SJPHKuModels from "../../../../models/SJPHKu";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import moment from "moment";

const colorOptions = [
    { value: 1, label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 2, label: 'Blue', color: '#0052CC', isFixed: true },
    { value: 3, label: 'Purple', color: '#5243AA', isFixed: true },
    { value: 4, label: 'Red', color: '#FF5630', isFixed: false },
    { value: 5, label: 'Orange', color: '#FF8B00', isFixed: false },
    { value: 6, label: 'Yellow', color: '#FFC400', isFixed: false }
]

const DaftarBahanDigunakanSetiapProdukForm = ({stepper, getSJPHInfo, detailsSJPH, setCheckpoint}) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [details, setDetails] = useState([])
    const [detailsOptions, setDetailsOptions] = useState([])
    const [tanggalDaftarBahanSetiapProduk, setTanggalDaftarBahanSetiapProduk] = useState("")
    const [tempatDaftarBahanSetiapProduk, setTempatDaftarBahanSetiapProduk] = useState("")
    const [namaProduk, setNamaProduk] = useState("")
    const [daftarBahan, setDaftarBahan] = useState([])
    const animatedComponents = makeAnimated()
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")

    const sjphKuModel = new SJPHKuModels()
    const bahanKepentinganHalalModel = new BahanKepentinganHalalModels()

    const navigate = useNavigate()

    const getAllDaftarBahanBySJPHID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getAllDaftarBahanBySJPHID(id)
            // setMediaKomunikasi(result)
            result.map((value)=>{
                detailsOptions.push({label: value.nama_dan_merek, value: value.id})
            })
            console.log("WOY JALAN DONG ", detailsOptions)
        } catch (e) {
            console.error(e)
        }
    }

    const getDaftarBahanProdukBySJPHID = async (id) => {
        try {
            const result = await bahanKepentinganHalalModel.getDaftarBahanProdukBySJPHID(id)
            setDetails(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getDaftarBahanProdukBySJPHID(sessionStorage.sjph_id)
        getAllDaftarBahanBySJPHID(sessionStorage.sjph_id)
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

    const columns = [
        {
            name: 'Nama Produk',
            // minWidth: '150px',
            selector: row => row.nama_produk,
            sortable: row => row.nama_produk
        },
        {
            name: 'Nama Bahan',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_dan_merek
        },
        {
            name: 'No. Sert. Halal',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.no_sert_halal
        },
        {
            name: 'Masa Berlaku Sert. Halal',
            sortable: true,
            minWidth: '270px',
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
                                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
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
        const daftar_bahan_id = daftarBahan.map((
            value => ({
                daftar_bahan_id: value,
            })
        ))
        const body = {
            daftar_bahan_id,
            nama_produk: namaProduk,
        }
        try {
            console.log(daftarBahan)
            const result = await bahanKepentinganHalalModel.createProduk(sessionStorage.sjph_id,body)
            if ((result)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getDaftarBahanProdukBySJPHID(sessionStorage.sjph_id)
                    })
            } else {
                await swal.fire('','Data gagal disimpan', 'error')
            }
        } catch (e) {
            console.error(e)
            await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin.")
        }
    }

    const submitTempatTanggal = async () => {
        const body = {
            tempat_persetujuan_daftar_bahan_setiap_produk: tempatPersetujuan? tempatPersetujuan : detailsSJPH.tempat_persetujuan_daftar_bahan_setiap_produk,
            tanggal_persetujuan_daftar_bahan_setiap_produk: tanggalPersetujuan? tanggalPersetujuan :  detailsSJPH.tanggal_persetujuan_daftar_bahan_setiap_produk
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
            <div className='content-header'>
                <h3 className='mb-0'>Halaman 2</h3>
                <small className='text-muted'>Daftar Bahan yang Digunakan Setiap Produk</small>
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
                            <Input id='tanggalPersetujuan' defaultValue={detailsSJPH.sjph_id && detailsSJPH.tempat_persetujuan_daftar_bahan_setiap_produk} placeholder='Isi Kota untuk Tempat Persetujuan (Cth: Jakarta)'
                                   onChange={(e)=>{ setTempatPersetujuan(e.target.value) }}  />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='tempatPersetujuan'>
                                Tanggal Persetujuan
                            </Label>
                            <Flatpickr
                                value={detailsSJPH.sjph_id && detailsSJPH.tanggal_persetujuan_daftar_bahan_setiap_produk}
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
                <div className='divider-text'>Form Daftar Bahan Setiap Produk <ArrowDown size={15} /></div>
            </div>
            <div className='content-header'>
                <h4 className='mb-0'>Isi Form Daftar Bahan Setiap Produk</h4>
            </div>
            <Form>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='nameMulti'>
                            Nama Produk
                        </Label>
                        <Input type='text' name='nama' id='nama' onChange={(e)=>{
                            setNamaProduk(
                                e.target.value)
                        }} placeholder='Nama Produk' />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label'>Daftar Bahan</Label>
                        <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={[colorOptions[4], colorOptions[5]]}
                            isMulti
                            options={detailsOptions}
                            className='react-select'
                            classNamePrefix='select'
                            onChange={(opt)=>{
                                opt.map(async (item) => {
                                    setDaftarBahan([...daftarBahan,item.value])
                                })
                            }}
                        />
                    </Col>
                    <Col sm='12'>
                        <div className='d-flex justify-content-center'>
                            <Button className='me-1' color='primary' onClick={submit}>
                                Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            <div className='divider divider-dashed'>
                <div className='divider-text'>Tabel Data <ArrowDown size={15} /></div>
            </div>
            <div className='content-header'>
                <h4 className='mb-0'>Tabel Form Daftar Bahan Setiap Produk</h4>
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
                        setCheckpoint(0)
                    }} outline>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Kembali</span>
                    </Button>
                    <Button className='me-1' color='primary' onClick={()=>{
                        stepper.next()
                        setCheckpoint(2)
                    }}>
                        <span className='align-middle d-sm-inline-block d-none'>Selanjutnya</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
            </Col>
        </Fragment>
    )

}
export default DaftarBahanDigunakanSetiapProdukForm
