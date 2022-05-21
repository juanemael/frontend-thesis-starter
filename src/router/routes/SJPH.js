import { lazy } from 'react'
// import KebijakanEdukasiHalal from "../../views/pages/sjph/module_3/KebijakanEdukasiHalal";

const CompanyProfilePage = lazy(() => import('../../views/pages/sjph/module_1/CompanyProfilePage'))
const KriteriaSistemJaminanProdukHalalPage = lazy(() => import('../../views/pages/sjph/module_2/KriteriaSistemJaminanProdukHalalPage'))
const KebijakanEdukasiHalal = lazy(() => import('../../views/pages/sjph/module_3/KebijakanEdukasiHalal'))

const SJPHRoutes = [
    {
        path: '/sjph/company_profile',
        element: <CompanyProfilePage />,
    },
    {
        path: '/sjph/kriteria_sistem_jaminan_produk_halal',
        element: <KriteriaSistemJaminanProdukHalalPage />
    },
    {
        path: '/sjph/kebijakan_dan_edukasi_halal',
        element: <KebijakanEdukasiHalal />
    }
]

export default SJPHRoutes
