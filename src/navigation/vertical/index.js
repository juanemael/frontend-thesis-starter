import { Mail, Home } from 'react-feather'
import {FaDochub} from "react-icons/all";

export default [
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
    navLink: '/sjph-page'
  }
]
