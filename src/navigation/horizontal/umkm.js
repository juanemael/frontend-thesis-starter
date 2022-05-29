import {Bookmark, BookOpen, Briefcase, Home, Layout, Repeat, ShoppingBag, Smile} from "react-feather";
import {FaDochub} from "react-icons/all";

export default [
    {
        header: 'UMKM',
        action: 'read',
        resource: 'UMKM'
    },
    {
        id: 'home',
        title: 'Beranda UMKM',
        icon: <Home size={20} />,
        navLink: '/beranda',
        action: 'read',
        resource: 'UMKM'
    },
    {
        header: 'Sertifikasi Halal UMKM',
        action: 'read',
        resource: 'UMKM'
    },
    {
        id: 'sjphDoc',
        title: 'Dokumen SJPH UMKM',
        icon: <FaDochub size={20} />,
        action: 'read',
        resource: 'UMKM',
        children: [
            {
                id: 'sjphKu',
                title: 'SJPH-ku',
                icon: <Bookmark size={20} />,
                navLink: '/sjph/sjph_ku',
                action: 'read',
                resource: 'UMKM'
            },
            {
                id: 'companyProfile',
                title: 'Informasi Umum Perusahaan',
                icon: <Briefcase size={20} />,
                navLink: '/sjph/informasi_umum_perusahaan',
                disabled: sessionStorage.sjph_id === "null",
                action: 'read',
                resource: 'UMKM'
            },
            {
                id: 'surKepPTMPHalal',
                title: 'Kriteria Sistem Jaminan Produk Halal',
                icon: <Layout size={20} />,
                navLink: '/sjph/kriteria_sistem_jaminan_produk_halal',
                disabled: sessionStorage.sjph_id === "null",
                action: 'read',
                resource: 'UMKM'
            },
            {
                id: 'kebijakanEdukasiHalal',
                title: 'Kebijakan dan Edukasi Halal',
                icon: <BookOpen size={20} />,
                navLink: '/sjph/kebijakan_dan_edukasi_halal',
                disabled: sessionStorage.sjph_id === "null",
                action: 'read',
                resource: 'UMKM'
            },
            {
                id: 'bahanKepentinganHalal',
                title: 'Bahan untuk Kepentingan Halal',
                icon: <ShoppingBag size={20} />,
                navLink: '/sjph/bahan_untuk_kepentingan_halal',
                disabled: sessionStorage.sjph_id === "null",
                action: 'read',
                resource: 'UMKM'
            },
            {
                id: 'kepentinganProduksiDistribusiProduk',
                title: 'Kepentingan Produksi dan Distribusi Produk',
                icon: <Repeat size={20} />,
                navLink: '/sjph/kepentingan_produksi_dan_distribusi_produk',
                disabled: sessionStorage.sjph_id === "null",
                action: 'read',
                resource: 'UMKM'
            },
            {
                id: 'auditKajiUlangManajemen',
                title: 'Audit dan Kaji Ulang Manajemen',
                icon: <Smile size={20} />,
                navLink: '/sjph/kaji_ulang_manajemen',
                disabled: sessionStorage.sjph_id === "null",
                action: 'read',
                resource: 'UMKM'
            },
        ]
    },
]