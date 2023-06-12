import { FC } from 'react';
import RoomSimpleView from '../components/RoomSimpleView';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const MyRoomsPage: FC = () => {
  const rooms: any[] = ['x'];
  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">My rooms</h1>
          <div className="page-header__divider"></div>
        </header>
        <Button variant="contained" type='submit' className='header__button'>
          <Link to="/rooms/new">Add new</Link>
        </Button>
      </div>
      <div className="rooms">
        {rooms.map(() => <RoomSimpleView />)}
      </div>
    </>
  );
}

export default MyRoomsPage;