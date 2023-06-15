import { FC } from 'react';
import { Offer } from '../models';
import Moment from 'moment';

const RoomSimpleView: FC<Offer> = (props: Offer) => {
  return (
    <div className="room-view">
      {Moment(props.startDate).format('MM.DD.YYYY') + " - " + Moment(props.endDate).format('MM.DD.YYYY')}
    </div>
  );
}

export default RoomSimpleView;