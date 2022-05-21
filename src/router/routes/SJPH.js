import { lazy } from 'react'

const CompanyProfilePage = lazy(() => import('../../views/pages/sjph/module_1/CompanyProfilePage'))
const KriteriaSistemJaminanProdukHalalPage = lazy(() => import('../../views/pages/sjph/module_2/KriteriaSistemJaminanProdukHalalPage'))

const SJPHRoutes = [
    {
        path: '/sjph/company_profile',
        element: <CompanyProfilePage />,
    },
    {
        path: '/sjph/kriteria_sistem_jaminan_produk_halal',
        element: <KriteriaSistemJaminanProdukHalalPage />
    }
]

export default SJPHRoutes
