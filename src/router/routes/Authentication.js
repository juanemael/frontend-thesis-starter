// ** React Imports
import { lazy } from 'react'
import blankLayout from "../../@core/layouts/BlankLayout";

const Login = lazy(() => import('../../views/pages/authentication/Login'))
const Register = lazy(() => import('../../views/pages/authentication/Register'))
const ForgotPassword = lazy(() => import('../../views/pages/authentication/ForgotPassword'))

const AuthenticationRoutes = [
    {
        path: '/login',
        element: <Login />,
        meta: {
            layout: 'blank',
            publicRoute: true,
            restricted: true
        }
    },
    {
        path: '/register',
        element: <Register />,
        meta: {
            layout: 'blank',
            publicRoute: true,
            restricted: true
        }
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        meta: {
            layout: 'blank',
            publicRoute: true,
            restricted: true
        }
    },
]

export default AuthenticationRoutes
