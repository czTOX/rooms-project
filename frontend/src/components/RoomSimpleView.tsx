import { Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../models';

const RoomSimpleView: FC<Room> = (prosp: Room) => {
  return (
    <div className="room-view">
      <img src="assets/room-example.jpg" alt="room" className='room-view__photo' />
      <div className="room-view-info">
        <div className="room-view-info__left">
          <h3 className="room-view-info__title text-bold">{prosp.caption}</h3>
        </div>
        <div className="room-view-info__right">
          <span className="room-view-info__price text-semibold">{prosp.pricePerNight}Kč / night</span>
          <Button variant="contained" className='room-view-info__button'>
            <Link to={`/rooms/${prosp.id}`}>
              Detail
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomSimpleView;