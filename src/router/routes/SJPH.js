import { lazy } from 'react'
import KajiUlangManajemenPage from "../../views/pages/sjph/module_6/KajiUlangManajemenPage";
// import KebijakanEdukasiHalalPage from "../../views/pages/sjph/module_3/KebijakanEdukasiHalalPage";

const SJPHKuPage = lazy(() => import('../../views/pages/sjph/my_sjph/MySJPHPage'))
const CompanyProfilePage = lazy(() => import('../../views/pages/sjph/module_1/CompanyProfilePage'))
const KriteriaSistemJaminanProdukHalalPage = lazy(() => import('../../views/pages/sjph/module_2/KriteriaSistemJaminanProdukHalalPage'))
const KebijakanEdukasiHalalPage = lazy(() => import('../../views/pages/sjph/module_3/KebijakanEdukasiHalalPage'))
const BahanKepentinganHalalPage = lazy(() => import('../../views/pages/sjph/module_4/BahanKepentinganHalalPage'))
const KepentinganProduksiDistribusiProdukPage = lazy(() => import('../../views/pages/sjph/module_5/KepentinganProduksiDistribusiProdukPage'))

const SJPHRoutes = [
    {
        path: '/sjph/sjph_ku',
        element: <SJPHKuPage />,
    },
    {
        path: '/sjph/informasi_umum_perusahaan',
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
    },
    {
        path: '/sjph/kepentingan_produksi_dan_distribusi_produk',
        element: <KepentinganProduksiDistribusiProdukPage />
    },
    {
        path: '/sjph/kaji_ulang_manajemen',
        element: <KajiUlangManajemenPage />
    }
]

export default SJPHRoutes
