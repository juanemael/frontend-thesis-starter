// ** Reactstrap Imports
import {
    DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Badge, Table, Col, Button
} from 'reactstrap'
import '@styles/react/libs/editor/editor.scss'
import {useState, Fragment} from "react";
import CompanyProfileModels from "../../../../models/CompanyProfile";
import swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import {Edit, MoreVertical, Trash} from "react-feather";

const MediaKomunikasiTable = () => {

    const [namaPerusahaan, setNamaPerusahaan] = useState("")
    const [tempatPersetujuan, setTempatPersetujuan] = useState("")
    const [tanggalPersetujuan, setTanggalPersetujuan] = useState("")


    const companyProfileModel = new CompanyProfileModels()

    const navigate = useNavigate()

    const submit = async () => {
        const body = {
            nama_perusahaan: namaPerusahaan,
        }
        try {
            const result = await companyProfileModel.createCompanyProfile(body)
            if ((result.id)||(result.success)) {
                await swal.fire('','Data berhasil di simpan','success')
                    .then(()=>{
                        navigate('/sjph/company_profile')
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
                <small className='text-muted'>Cari tahu tentang kebijakan halal</small>
            </div>
            <Table responsive>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Tanggal Sosialisasi</th>
                    <th>Judul Kegiatan</th>
                    <th>Peserta</th>
                    <th>Bukti Hasil Sosialisasi</th>
                    <th>Menu</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <span className='align-middle fw-bold'>1.</span>
                    </td>
                    <td>11-09-2022</td>
                    <td>
                        <Badge pill color='light-primary' className='me-1'>
                            Melakukan Halal
                        </Badge>
                    </td>
                    <td>5</td>
                    <td>Bukti</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className='me-75' src={react} alt='react' height='20' width='20' />
                        <span className='align-middle fw-bold'>React Project</span>
                    </td>
                    <td>Ronald Frest</td>
                    <td>
                        <Badge pill color='light-success' className='me-1'>
                            Completed
                        </Badge>
                    </td>
                    <td>5</td>
                    <td>Bukti</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className='me-75' src={vuejs} alt='vuejs' height='20' width='20' />
                        <span className='align-middle fw-bold'>Vuejs Project</span>
                    </td>
                    <td>Jack Obes</td>
                    <td>
                        <Badge pill color='light-info' className='me-1'>
                            Scheduled
                        </Badge>
                    </td>
                    <td>5</td>
                    <td>Bukti</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img className='me-75' src={bootstrap} alt='bootstrap' height='20' width='20' />
                        <span className='align-middle fw-bold'>Bootstrap Project</span>
                    </td>
                    <td>Jerry Milton</td>
                    <td>
                        <Badge pill color='light-warning' className='me-1'>
                            Pending
                        </Badge>
                    </td>
                    <td>5</td>
                    <td>Bukti</td>
                    <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                                </DropdownItem>
                                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
                </tbody>
            </Table>
            <Col sm='12'>
                <div className='d-flex justify-content-end'>
                    <Button className='me-1' color='primary' onClick={submit}>
                        Tambah
                    </Button>
                </div>
            </Col>
        </Fragment>
    )

}
export default MediaKomunikasiTable
