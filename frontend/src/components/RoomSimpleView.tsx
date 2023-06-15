import { Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../models';

const RoomSimpleView: FC<Room> = (props: Room) => {
  return (
    <div className="room-view">
      <img
        src={props.photosUrls.split(';')[0]}
        alt="room"
        className="room-view__photo"
      />
      <div className="room-view-info">
        <div className="room-view-info__left">
          <h3 className="room-view-info__title text-bold">{props.caption}</h3>
        </div>
        <div className="room-view-info__right">
          <span className="room-view-info__price text-semibold">
            {props.pricePerNight}Kč / night
          </span>
          <Button variant="contained" className="room-view-info__button">
            <Link to={`/rooms/${props.id}`}>Detail</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomSimpleView;
