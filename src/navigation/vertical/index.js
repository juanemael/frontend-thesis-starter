import {Mail, Home, Menu, Circle, Briefcase, Layout, BookOpen} from 'react-feather'
import {FaDochub} from "react-icons/all";

export default [
  {
    header: 'User'
  },
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    header: 'Sertifikasi Halal'
  },
  {
    id: 'sjphPage',
    title: 'SJPH Page',
    icon: <FaDochub size={20} />,
    children: [
      {
        id: 'companyProfile',
        title: 'Informasi Umum Perusahaan',
        icon: <Briefcase size={20} />,
        navLink: '/sjph/company_profile',
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
        icon: <Layout size={20} />,
        navLink: '/coming_soon',
      },
      {
        id: 'kepentinganProduksiPemusnahanProduk',
        title: 'Kepentingan Produksi dan Pemusnahan Produk',
        icon: <Layout size={20} />,
        navLink: '/coming_soon',
      },      {
        id: 'auditKajiUlangManajemen',
        title: 'Audit dan Kaji Ulang Manajemen',
        icon: <Layout size={20} />,
        navLink: '/coming_soon',
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
