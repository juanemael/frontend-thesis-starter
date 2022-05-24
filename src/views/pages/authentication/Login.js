import { useSkin } from '@hooks/useSkin'
import {Link, useNavigate} from 'react-router-dom'
import {Facebook, Twitter, Mail, GitHub, Coffee, X, HelpCircle, Lock} from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  UncontrolledTooltip,
  Alert,
  Toast,
  ToastHeader, ToastBody, InputGroupText, InputGroup
} from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import {useDispatch} from "react-redux"
import {AbilityContext} from "@src/utility/context/Can"
import {useContext, useState} from "react"
import Avatar from "../../../@core/components/avatar"
import toast from "react-hot-toast"
import {getHomeRouteForLoggedInUser} from "@utils"
import useJwt from '@src/auth/jwt/useJwt'
import {useForm, Controller} from "react-hook-form"
import { handleLogin } from '@store/authentication'
import UserModels from '../../../models/User'
import {FaBeer, FaCross, FaInfo} from 'react-icons/fa'

const defaultValues = {
  password: 'admin',
  loginEmail: 'admin@demo.com'
}

const ToastContent = ({ t, name, role }) => {
  return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <h6>{name}</h6>
            <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
          </div>
          <span>Kamu telah berhasi login sebagai {role} user di PasporUMKM. Sekarang kamu bisa mulai eksplorasimu.</span>
        </div>
      </div>
  )
}

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
          <span>Email atau passwordmu salah. Tolong coba lagi.</span>
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

const Login = () => {
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
      source = require(`@src/assets/images/pages/${illustration}`).default

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = async () => {
    try {
      const result = await UserModels.login(email,password)
      if (!email || !password) {
        toast(t =>(
            <ToastDanger t={t} />
        ))
      } else if (!result) {
        console.log("error")
      } else {
        if (result.token) {
          localStorage.token = result.token
          localStorage.email = result.email
          // localStorage.role = result.role
          sessionStorage.token = result.token
          sessionStorage.username = result.username
          sessionStorage.user_id = result.id

          toast(t => (
              <ToastContent t={t} role={'user'} name={result.email || 'Unknown'}/>
          ))

          await navigate('/beranda')
        } else {
          toast(t =>(
              <ToastDanger t={t} />
          ))
        }
      }
    } catch (e) {
      toast(t =>(
          <ToastDanger t={t} />
      ))
      console.error(e)
    }
  }

  const handleKeyPress = e =>{
    if (e.key === "Enter") {
      submitLogin()
    }
  }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      useJwt
          .login({ email: data.loginEmail, password: data.password })
          .then(res => {
            const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
            dispatch(handleLogin(data))
            ability.update(res.data.userData.ability)

            navigate(getHomeRouteForLoggedInUser(data.role))
            toast(t => (
                <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
            ))
          })
          .catch(err => console.log(err))
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
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Selamat datang di PasporUMKM! 👋
            </CardTitle>
            <CardText className='mb-2'>Mohon untuk sign-in menggunakan akun anda untuk melanjutkan perjalanan anda. </CardText>
            {/*<Alert color='primary'>*/}
            {/*  <div className='alert-body font-small-2'>*/}
            {/*    <p>*/}
            {/*      <small className='me-50'>*/}
            {/*        <span className='fw-bold'>Admin:</span> admin@demo.com | admin*/}
            {/*      </small>*/}
            {/*    </p>*/}
            {/*    <p>*/}
            {/*      <small className='me-50'>*/}
            {/*        <span className='fw-bold'>Client:</span> client@demo.com | client*/}
            {/*      </small>*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*  <HelpCircle*/}
            {/*      id='login-tip'*/}
            {/*      className='position-absolute'*/}
            {/*      size={18}*/}
            {/*      style={{ top: '10px', right: '10px' }}*/}
            {/*  />*/}
            {/*  <UncontrolledTooltip target='login-tip' placement='left'>*/}
            {/*    This is just for ACL demo purpose.*/}
            {/*  </UncontrolledTooltip>*/}
            {/*</Alert>*/}
            <Form className='auth-login-form mt-2'>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <InputGroup className='input-group-merge'>
                <InputGroupText>
                  <Mail size={15} />
                </InputGroupText>
                  <Input type='email' placeholder='john@example.com' onChange={(e) => { setEmail(e.target.value) }} invalid={errors.email && true} autoFocus required />
                </InputGroup>
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Lupa Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle className='input-group-merge' onChange={(e) => { setPassword(e.target.value) }} onKeyPress={handleKeyPress} invalid={errors.password && true} required />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Ingat Saya
                </Label>
              </div>
              {/*<Button tag={Link} to='/' color='primary' block>*/}
              <Button color='primary' onClick={submitLogin} block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Baru di PasporUMKM?</span>
              <Link to='/register'>
                <span>Buatlah akunmu</span>
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

export default Login
