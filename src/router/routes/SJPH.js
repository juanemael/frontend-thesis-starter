import { lazy } from 'react'
// import KebijakanEdukasiHalalPage from "../../views/pages/sjph/module_3/KebijakanEdukasiHalalPage";

const CompanyProfilePage = lazy(() => import('../../views/pages/sjph/module_1/CompanyProfilePage'))
const KriteriaSistemJaminanProdukHalalPage = lazy(() => import('../../views/pages/sjph/module_2/KriteriaSistemJaminanProdukHalalPage'))
const KebijakanEdukasiHalalPage = lazy(() => import('../../views/pages/sjph/module_3/KebijakanEdukasiHalalPage'))
const BahanKepentinganHalalPage = lazy(() => import('../../views/pages/sjph/module_4/BahanKepentinganHalalPage'))

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
        element: <KebijakanEdukasiHalalPage />
    },
    {
        path: '/sjph/bahan_untuk_kepentingan_halal',
        element: <BahanKepentinganHalalPage />
    }
]

export default SJPHRoutes