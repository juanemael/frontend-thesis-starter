// ** React Imports
import {Link, useNavigate} from 'react-router-dom'

// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import {Facebook, Twitter, Mail, GitHub, X, User} from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

import swal from 'sweetalert2'

import * as yup from 'yup'

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  InputGroupText,
  InputGroup
} from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import {useState} from "react"
import UserModels from '../../../models/User'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import Avatar from "../../../@core/components/avatar"
import {FaInfo} from "react-icons/fa"
import toast from "react-hot-toast"
import isEmail from "validator/es/lib/isEmail";
import Select from "react-select";
import { selectThemeColors } from '@utils'

const roleOptions = [
  { value: 'UMKM', label: 'UMKM' },
  { value: 'PENYELIA_HALAL', label: 'Penyelia Halal' },
  { value: 'AUDITOR', label: 'Auditor' },
]

const ability = [
  [
    {
        action: "manage", subject: "UMKM"
      }
  ],
  [
    {
        action: "manage", subject: "PenyeliaHalal"
      }
  ],
  [
    {
        action: "manage", subject: "Auditor"
      }
  ]
]

const Register = () => {
  // ** Hooks
  // const {skin} = useSkin()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")

  const userModel = new UserModels()
  const navigate = useNavigate()

  const ToastDanger = () =>{
    return (
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<FaInfo size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
            </div>
            <span>Password tidak sama dengan konfirmasi password. Tolong coba lagi.</span>
          </div>
        </div>
    )
  }

  const ToastEmpty = () =>{
    return (
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<FaInfo size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
            </div>
            <span>Tolong isi kolom yang kosong.</span>
          </div>
        </div>
    )
  }

  const ToastEmail = () =>{
    return (
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='danger' icon={<FaInfo size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
            </div>
            <span>Tolong isi kolom email dengan benar.</span>
          </div>
        </div>
    )
  }

  // const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
  //     source = require(`@src/assets/images/pages/${illustration}`).default

  const source = require(`@src/assets/images/pages/register-v2.svg`).default

  const submission = async () => {

    if (!username || !email || !password) {
      toast(t =>(
          <ToastEmpty t={t} />
      ))
    } else if (!isEmail(email)) {
      toast(t =>(
          <ToastEmail t={t} />
      ))
    } else {
        if (password !== confirmPassword) {
        toast(t =>(
            <ToastDanger t={t} />
        ))
      } else {
            const body = {
              username,
              email,
              password,
              role: role.value,
              // eslint-disable-next-line multiline-ternary
              ability: role.value === "UMKM" ? ability[0]
                  // eslint-disable-next-line multiline-ternary
                  :  role.value === "PENYELIA_HALAL"
                      // eslint-disable-next-line multiline-ternary
                      ? ability[1] : role.value === "AUDITOR" ?
                          ability[2] : "null"
            }

            try {
              console.log("ABILITY JSON", body.ability)
              console.log("ABILITY JSON 2", role.value)
              const result = await userModel.register(body)
              if ((result.id) || (result.success)) {
                await swal.fire('', "Data berhasil di simpan", 'success')
                    .then(() => {
                      navigate('/login')
                    })
              } else {
                await swal.fire('', "Data gagal disimpan", 'error')
              }
            } catch (e) {
              console.error(e)
              await swal.fire('Error', e.error_message ? e.error_message : "Terjadi Error! Mohon kontak admin. ", "error")
            }
          }
        }
  }


  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ms-1'>PasporUMKM</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' xs='12' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Perjalananmu dimulai dari sini 🚀
            </CardTitle>
            <CardText className='mb-2'>Membuat proses sertifikasi menjadi menyenangkan!</CardText>
            <Form className='auth-register-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText>
                    <User size={15} />
                  </InputGroupText>
                <Input type='text' id='register-username' placeholder='username' onChange={(e) => { setUsername(e.target.value) }} autoFocus required />
                </InputGroup>
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText>
                    <Mail size={15} />
                  </InputGroupText>
                <Input type='email' id='register-email' onChange={(e) => { setEmail(e.target.value) }} placeholder='email (contoh@email.com)' required/>
                </InputGroup>
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle className='input-group-merge' id='register-password' onChange={(e) => { setPassword(e.target.value) }}/>
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Ketik Ulang Password
                </Label>
                <InputPasswordToggle className='input-group-merge' id='confirm-password' onChange={(e) => { setConfirmPassword(e.target.value) }}/>
              </div>
              <div className='mb-1'>
                <Label className='form-label'>Daftar Sebagai</Label>
                <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    // defaultValue={roleOptions[1]}
                    placeholder={"Pilih disini"}
                    name='clear'
                    options={roleOptions}
                    onChange={(opt)=>{
                      setRole(opt)
                    }}
                    isClearable
                />
                </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='terms' />
                <Label className='form-check-label' for='terms'>
                  Saya mengerti
                  <a className='ms-25' href='/src/views/pages' onClick={e => e.preventDefault()}>
                    tentang kebijakan dan ketentuan.
                  </a>
                </Label>
              </div>
              <Button onClick={() => {
                submission()
              }} color='primary' block>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Sudah punya akun?</span>
              <Link to='/login'>
                <span>Sign in disini</span>
              </Link>
            </p>
            {/*<div className='divider my-2'>*/}
            {/*  <div className='divider-text'>or</div>*/}
            {/*</div>*/}
            {/*<div className='auth-footer-btn d-flex justify-content-center'>*/}
            {/*  <Button color='facebook'>*/}
            {/*    <Facebook size={14} />*/}
            {/*  </Button>*/}
            {/*  <Button color='twitter'>*/}
            {/*    <Twitter size={14} />*/}
            {/*  </Button>*/}
            {/*  <Button color='google'>*/}
            {/*    <Mail size={14} />*/}
            {/*  </Button>*/}
            {/*  <Button className='me-0' color='github'>*/}
            {/*    <GitHub size={14} />*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
