// ** React Imports
import {Link, useNavigate} from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const logout = () => {
  sessionStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("sjph_id");
  localStorage.removeItem("sjph_id");
  localStorage.removeItem("ability");
}

const UserDropdown = () => {
  const navigate = useNavigate()

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{sessionStorage.username}</span>
          <span className='user-status'>{
            // eslint-disable-next-line multiline-ternary
            (sessionStorage.role === "UMKM" ?
                // eslint-disable-next-line multiline-ternary
                (<>UMKM</>) : sessionStorage.role === "PENYELIA_HALAL" ?
                    // eslint-disable-next-line multiline-ternary
                (<>Penyelia Halal</>) : sessionStorage.role === "AUDITOR" ?
                (<> Auditor </>) : (<>User</>))
          }</span>
        </div>
        <Avatar img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/coming_soon'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/coming_soon' >
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={logout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
