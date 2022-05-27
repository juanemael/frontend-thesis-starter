import { lazy } from 'react'

const SJPHAuditorPage = lazy(() => import('../../../views/pages/sjph/sjph_auditor/SJPHAuditorPage'))


const AuditorRoutes = [
    {
        path: '/sjph/auditor',
        element: <SJPHAuditorPage />,
        meta: {
            action: 'read',
            resource: 'Auditor'
        }
    },
]

export default AuditorRoutes
