import { FC } from 'react';
import { Booking } from '../models';
import Moment from 'moment';

const RoomDetailView: FC<Booking> = (props: Booking) => {
  return (
    <div className="room-view">
      <img
        src={props.room.photosUrls.split(';')[0]}
        alt="room"
        className="room-view__photo"
      />
      <div className="room-view-info">
        <div className="room-view-info__left">
          <h3 className="room-view__title text-bold">{props.room.caption}</h3>
          <span className="room-view__date text-regular">
            {Moment(props.startDate).format('MM.DD.YYYY') +
              ' - ' +
              Moment(props.endDate).format('MM.DD.YYYY')}
          </span>
        </div>
        <div className="room-view-info__right">
          <span className="room-view-info__price text-semibold">
            {props.totalPrice} Kč
          </span>
          {/* <Button variant="contained" className='room-view-info__button'>
            <Link to={`/rooms/${props.roomId}`}>
              Detail
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailView;
