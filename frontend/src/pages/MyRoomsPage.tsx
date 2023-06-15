import { FC } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../services';
import MyRoomView from '../components/MyRoomView';

const MyRoomsPage: FC = () => {
  const { data: myRooms } = useQuery({
    queryKey: ['myRooms'],
    queryFn: () => UsersApi.getMyRooms(),
  });

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">My rooms</h1>
          <div className="page-header__divider"></div>
        </header>
        <Button variant="contained" type="submit" className="header__button">
          <Link to="/rooms/new">Add new</Link>
        </Button>
      </div>
      <div className="rooms">
        {myRooms?.data.rooms.map((room) => (
          <MyRoomView key={room.id} {...room} />
        ))}
      </div>
    </>
  );
};

export default MyRoomsPage;
