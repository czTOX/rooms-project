import { Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const RoomDetailView: FC = () => {
  return (
    <div className="room-view">
      <img src="assets/room-example.jpg" alt="room" className='room-view__photo' />
      <div className="room-view__left">
        <h3 className="room-view__title text-bold">Title / Location</h3>
        <span className="room-view__date text-regular">3.4.2022 - 5.4.2022</span>
      </div>
      <div className="room-view__right">
        <span className="room-view__price text-semibold">2 342Kč / night</span>
        <Button variant="contained" className='room-view__button'>
          <Link to={`/rooms/&{id}`}>
            Detail
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default RoomDetailView;