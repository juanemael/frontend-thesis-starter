import { lazy } from 'react'

const SJPHPenyeliaHalalPage = lazy(() => import('../../../views/pages/sjph/sjph_penyelia_halal/SJPHPenyeliaHalalPage'))


const PenyeliaHalalRoutes = [
    {
        path: '/sjph/penyelia_halal',
        element: <SJPHPenyeliaHalalPage />,
        meta: {
            action: 'read',
            resource: 'PenyeliaHalal'
        }
    },
]

export default PenyeliaHalalRoutes
