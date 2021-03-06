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
    Row, Label, Input, FormFeedback, Modal, CardHeader, CardTitle, Card, CardBody, UncontrolledButtonDropdown
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment, forwardRef, useEffect, useContext} from "react";
import SJPHModels from "../../../../models/SJPHKu";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import {
    Archive,
    ChevronDown,
    Copy,
    Edit,
    File,
    FileText,
    MoreVertical,
    Printer,
    Share,
    Trash,
    Grid, Plus
} from "react-feather";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'

import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'shepherd.js/dist/css/shepherd.css'
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss'
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {ShepherdTour, ShepherdTourContext} from "react-shepherd";
import navigation from '@src/navigation/vertical'
import ReactDOM from "react-dom";
// import VerticalLayout from "../../../../layouts/VerticalLayout";
import VerticalLayout from "../../../../layouts/VerticalLayout";

const SJPHPenyeliaHalalTable = () => {

    const [sjphName, setSJPHName] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [details, setDetails] = useState([])
    const [sjph, setSJPH] = useState([])
    const [disable, setDisable] = useState(false)


    const sjphModel = new SJPHModels()

    const navigate = useNavigate()

    // ** States
    const [show, setShow] = useState(false)

    // ** Hooks
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const getSJPH = async () => {
        try {
            const result = await sjphModel.getAll()
            setSJPH(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
            getSJPH()
    },[])

    const backBtnClass = 'btn btn-sm btn-outline-primary',
        nextBtnClass = 'btn btn-sm btn-primary btn-next'

    let instance = null

    const steps = [
        {
            id: 'tambahData',
            title: 'Tambah SJPH',
            text: 'Klik tombol ini untuk membuat SJPH terlebih dahulu',
            attachTo: { element: '#buttonTambah', on: 'top' },
            cancelIcon: {
                enabled: true
            },
            buttons: [
                {
                    text: 'Kembali',
                    classes: backBtnClass,
                    action: () => instance.back()
                },
                {
                    text: 'Selanjutnya',
                    classes: nextBtnClass,
                    action: () => instance.next()
                }
            ]
        },
        {
            id: 'dataTable',
            title: 'Data Table',
            text: 'Ini table SJPH-Mu setelah membuat SJPH, klik tombol pilih di SJPH yang anda ingin isi.',
            attachTo: { element: '#dataTable', on: 'bottom' },
            cancelIcon: {
                enabled: true
            },
            buttons: [
                {
                    action: () => instance.cancel(),
                    classes: backBtnClass,
                    text: 'Lewati'
                },
                {
                    text: 'Selanjutnya',
                    classes: nextBtnClass,
                    action: () => instance.next()
                }
            ]
        },
        {
            id: 'card',
            title: 'Tur Selesai',
            text: 'Tur Selesai. Semoga Berhasil!',
            attachTo: { element: '', on: 'top' },
            cancelIcon: {
                enabled: true
            },
            buttons: [
                {
                    text: 'Kembali',
                    classes: backBtnClass,
                    action: () => instance.back()
                },
                {
                    text: 'Selesai',
                    classes: nextBtnClass,
                    action: () => instance.cancel()
                }
            ]
        },
    ]


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
            updatedData = sjph.filter(item => {
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
            pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(sjph.length / 7) || 1}
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

    const onSubmitModal = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            return null
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }


    const submit = async () => {
        const body = {
            nama_sjph: sjphName,
            user_id: sessionStorage.user_id
        }
        try {
            const result = await sjphModel.createSJPH(body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        getSJPH()
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

    const deleteSJPH = async (id) => {
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
                    const result = await sjphModel.deleteSJPH(id);

                    if (result.id || result.success) {
                        await Swal.fire({
                            icon: "success",
                            title: "Sukses menghapus!",
                            text: 'Data kamu telah dihapus.',
                            customClass: {
                                confirmButton: 'btn btn-success'
                            }
                        }).then(()=>{
                            getSJPH()
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

    const reload = async () => {
        window.location.reload()
    }

    const selectSJPH = async (id,perusahaan_id,name) =>{
        try {
            setDisable(false)
            sessionStorage.sjph_id = id
            sessionStorage.nama_sjph = name
            sessionStorage.perusahaan_id = perusahaan_id
            await reload()
            setTimeout(toast.success(`Anda telah memilih SJPH ${name}`),5000)
        } catch (e) {
            console.error(e)
        }
    }

    const BootstrapCheckbox = forwardRef((props, ref) => (
        <div className='form-check'>
            <Input type='checkbox' ref={ref} {...props} />
        </div>
    ))

    const columns = [
        {
            name: 'ID',
            // minWidth: '150px',
            selector: row => row.sjph_id,
            sortable: row => row.sjph_id
        },
        {
            name: 'Nama SJPH',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.nama_sjph
        },
        {
            name: 'Dibuat pada',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.created_at
        },

        {
            name: 'Diubah pada',
            sortable: true,
            // minWidth: '150px',
            selector: row => row.modified_at
        },
        {
            name:  'Pilihan',
            cell:  (row) => {
                return (
                    <Button className='me-1' disabled={sessionStorage.sjph_id === row.sjph_id? disable: false} color='primary'
                            id='buttonPilihan' onClick={()=>{ selectSJPH(row.sjph_id,row.perusahaan_id,row.nama_sjph) }}>
                        Pilih
                    </Button>
                )
            }
        },
        {
            name:  'Persetujuan',
            cell:  (row) => {
                return (
                    <Button className='me-1' disabled={sessionStorage.sjph_id === row.sjph_id? disable: false} color='primary'
                            id='buttonPilihan' onClick={()=>{ selectSJPH(row.sjph_id,row.perusahaan_id,row.nama_sjph) }}>
                        Disetujui
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
                            <DropdownToggle className='pe-1' tag='span' >
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>Details</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={()=>{ deleteSJPH(row.sjph_id) }}>
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

    const Content = () => {
        const tour = useContext(ShepherdTourContext)
        instance = tour

        return (
            <Button className='ms-2' color='primary' onClick={() => tour.start()} >
                <span className='align-middle ms-50'>Mulai Tur!</span>
            </Button>
        )
    }


    return (
        <Fragment>
            <ShepherdTour
            steps={steps}
            tourOptions={{
                useModalOverlay: true
            }} >
            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>Tambah SJPH</h1>
                        <p>Tambah SJPH-mu untuk mulai mengisi modul</p>
                    </div>
                    <Row tag='form' className='gy-1 pt-75'>
                        <Col xs={12}>
                            <Label className='form-label' for='sjphName'>
                                Nama SJPH
                            </Label>
                            <Input id='sjphName' placeholder='SJPH Tahun 2022' value={sjphName} onChange={(e)=> setSJPHName(e.target.value)} invalid={errors.sjphName && true} />
                        </Col>
                        <Col xs={12} className='text-center mt-2 pt-50'>
                            <Button onClick={submit} className='me-1' color='primary'>
                                Kirim
                            </Button>
                            <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                                Batal
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <Card>
                <CardHeader>
                    <CardTitle> SJPH - PENYELIA HALAL </CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ms-50'>Print</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => navigate('/sjph/export/PDF')}>
                                    <File size={15} />
                                    <span className='align-middle ms-50'>PDF</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Content />
                    </div>
                </CardHeader>
                <CardBody>
            <div className='content-header'>
                <h3 className='mb-0'>Daftar SJPH</h3>
                <small className='text-muted'>Berikut adalah tabel daftar SJPH yang dibuat oleh kamu</small>
            </div>
                <Row className='justify-content-end mx-0'>
                    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                        <Label className='me-1' for='search-input'>
                            Search
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
            <div className='react-dataTable react-dataTable-selectable-rows' id= 'dataTable'  >
                <DataTable
                    noHeader
                    pagination
                    selectableRows
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : sjph}
                    selectableRowsComponent={BootstrapCheckbox}
                />
            </div>
            &nbsp;
            <Col sm='12'>
                <div className='d-flex justify-content-end'>
                    <Button className='me-1' color='primary' id='buttonTambah' onClick={()=> setShow(true)}>
                        Tambah
                    </Button>
                </div>
            </Col>
                </CardBody>
        </Card>
            </ShepherdTour>
        </Fragment>
    )

}
export default SJPHPenyeliaHalalTable
