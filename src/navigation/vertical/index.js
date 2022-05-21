import {Mail, Home, Menu, Circle, Briefcase, Layout} from 'react-feather'
import {FaDochub} from "react-icons/all";

export default [
  {
    header: 'Misc'
  },
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'sjphPage',
    title: 'SJPH Page',
    icon: <FaDochub size={20} />,
    children: [
      {
        id: 'companyProfile',
        title: 'Company Profile',
        icon: <Briefcase size={20} />,
        navLink: '/sjph/company_profile',
      },
      {
        id: 'surKepPTMPHalal',
        title: 'Surat Keputusan PTMP Halal',
        icon: <Layout size={20} />,
        navLink: '/sjph/company_profile',
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
