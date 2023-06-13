import { FC } from 'react';
import RoomSimpleView from '../components/RoomSimpleView';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../services';


const MyRoomsPage: FC = () => {
  const { data: myRooms } = useQuery({
    queryKey: ['myRooms'],
    queryFn: () => UsersApi.getMyRooms(),
  });

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
        {myRooms?.data.map((room) => <RoomSimpleView {...room} />)}
      </div>
    </>
  );
}

export default MyRoomsPage;