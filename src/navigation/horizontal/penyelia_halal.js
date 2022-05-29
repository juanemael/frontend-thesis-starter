// ** Icons Import
import {Home, Circle, Book} from 'react-feather'

export default [
    {
        header: 'Penyelia Halal',
        action: 'read',
        resource: 'PenyeliaHalal',
    },
    {
        id: 'home',
        title: 'Beranda Penyelia Halal',
        icon: <Home size={20} />,
        navLink: '/beranda',
        action: 'read',
        resource: 'PenyeliaHalal',
    },
    {
        header: 'Sertifikasi Halal Penyelia Halal',
        action: 'read',
        resource: 'PenyeliaHalal'
    },
    {
        id: 'sjphPenyeliaHalal',
        title: 'SJPH Penyelia Halal',
        icon: <Book size={20} />,
        navLink: '/sjph/penyelia_halal',
        action: 'read',
        resource: 'PenyeliaHalal'
    },
]
