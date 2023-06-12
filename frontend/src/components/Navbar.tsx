import { FC } from 'react';
import { Link } from 'react-router-dom';
import { logedInAtom } from '../state/atoms';
import { useRecoilValue } from 'recoil';

const Navbar: FC = () => {

  const logedIn = useRecoilValue(logedInAtom);

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar__logo text-semibold'>Rooms</Link>
      <div className="navbar__links">
        <Link to='/' className='navbar__links-link navbar__button text-regular'>Room listings</Link>
        {logedIn ? 
          <>
            <Link to='/my-bookings' className='navbar__links-link navbar__button text-regular'>My bookings</Link>
            <Link to='/my-rooms' className='navbar__links-link navbar__button text-regular'>My rooms</Link>
          </> : <></>
        }
      </div>
      <Link to='/login' className='navbar__login navbar__button text-regular'>Login</Link>
    </nav>
  )
}

export default Navbar;