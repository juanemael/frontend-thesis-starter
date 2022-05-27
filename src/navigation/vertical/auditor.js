// ** Icons Import
import {Home, Circle, Book} from 'react-feather'

export default [
    {
        header: 'Auditor',
        action: 'read',
        resource: 'Auditor',
    },
    {
        id: 'home',
        title: 'Beranda Auditor',
        icon: <Home size={20} />,
        navLink: '/beranda',
        action: 'read',
        resource: 'Auditor',
    },
    {
        header: 'Sertifikasi Halal Auditor',
        action: 'read',
        resource: 'Auditor'
    },
    {
        id: 'sjphPenyeliaHalal',
        title: 'SJPH Auditor',
        icon: <Book size={20} />,
        navLink: '/sjph/auditor',
        action: 'read',
        resource: 'Auditor'
    },
]
