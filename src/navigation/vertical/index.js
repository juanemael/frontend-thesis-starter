import {Mail, Home, Menu, Circle, Briefcase, Layout, BookOpen, ShoppingBag, Target, Smile, Repeat} from 'react-feather'
import {FaDochub} from "react-icons/all";

export default [
  {
    header: 'User'
  },
  {
    id: 'home',
    title: 'Beranda',
    icon: <Home size={20} />,
    navLink: '/beranda'
  },
  {
    header: 'Sertifikasi Halal'
  },
  {
    id: 'sjphDoc',
    title: 'Dokumen SJPH',
    icon: <FaDochub size={20} />,
    children: [
      {
        id: 'companyProfile',
        title: 'Informasi Umum Perusahaan',
        icon: <Briefcase size={20} />,
        navLink: '/sjph/informasi_umum_perusahaan',
      },
      {
        id: 'surKepPTMPHalal',
        title: 'Kriteria Sistem Jaminan Produk Halal',
        icon: <Layout size={20} />,
        navLink: '/sjph/kriteria_sistem_jaminan_produk_halal',
      },
      {
        id: 'kebijakanEdukasiHalal',
        title: 'Kebijakan dan Edukasi Halal',
        icon: <BookOpen size={20} />,
        navLink: '/sjph/kebijakan_dan_edukasi_halal',
      },
      {
        id: 'bahanKepentinganHalal',
        title: 'Bahan untuk Kepentingan Halal',
        icon: <ShoppingBag size={20} />,
        navLink: '/sjph/bahan_untuk_kepentingan_halal',
      },
      {
        id: 'kepentinganProduksiDistribusiProduk',
        title: 'Kepentingan Produksi dan Distribusi Produk',
        icon: <Repeat size={20} />,
        navLink: '/sjph/kepentingan_produksi_dan_distribusi_produk',
      },
      {
        id: 'auditKajiUlangManajemen',
        title: 'Audit dan Kaji Ulang Manajemen',
        icon: <Smile size={20} />,
        navLink: '/sjph/kaji_ulang_manajemen',
      },
    ]
  },
  // {
  //   id: 'menuLevels',
  //   title: 'Menu Levels',
  //   icon: <Menu size={20} />,
  //   children: [
  //     {
  //       id: 'secondLevel',
  //       title: 'Second Level 2.1',
  //       icon: <Menu size={12} />,
  //       navLink: '/sjph/company_profile',
  //     },
  //   ]
  // },

]
// Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal secara konsisten dan berkesinambungan dengan melakukan tindakan:
//     1.	Mematuhi peraturan perundangan terkait jaminan produk halal
// 2.	Menggunakan bahan halal dan melaksanakan proses produk halal (PPH)
// 3.	Menyiapkan sumber daya manusia yang mendukung pelaksanaan PPH di perusahaan
// 4.	Mensosialisasikan dan mengkomunikasikan kebijakan halal pada seluruh pihak terkait untuk memastikan semua personel menjaga integritas halal di perusahaan.
