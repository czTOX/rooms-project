import { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RoomDetailCarousel from '../components/RoomDetailCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BookingsApi, LocationApi, RoomsApi } from '../services';
import { NewBooking } from '../models';
import moment from 'moment';
import Moment from 'moment';
import { useRecoilValue } from 'recoil';
import { filterDatesAtom, logedInAtom } from '../state/atoms';


const RoomDetailPage: FC = () => {
  const { id } = useParams();
  const logedIn = useRecoilValue(logedInAtom);
  const filterDates = useRecoilValue(filterDatesAtom);
  const navigate = useNavigate();
  
  const { data: room } = useQuery({
    queryKey: ['room', id],
    queryFn: () => RoomsApi.getSingle(id!),
    enabled: !!id,
  });

  const { mutate: bookRoom } = useMutation({
    mutationFn: (body: NewBooking) => BookingsApi.bookRoom(body),
    onSuccess: () => {
      alert("Booking was successful");
      navigate('/my-bookings');
    }
  });

  function tryToBookRoom() {
    var body = {
      startDate: filterDates.startDate ? filterDates.startDate.toISOString() : "",
      endDate: filterDates.endDate ? filterDates.endDate.toISOString() : "",
      totalPrice: totalPrice,
      roomId: room ? room?.data.id : "",
    }
    if (logedIn) {
      bookRoom(body);
    } else {
      alert("You need to login first!")
    }
  }


  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (filterDates.endDate && room) {
      const diff = Moment(filterDates.endDate).diff(Moment(filterDates.startDate));
      const diffDuration = moment.duration(diff);
      if(diffDuration.days() > 0) {
        setTotalPrice(diffDuration.days() * room?.data.pricePerNight);
      }
    }
  }, []);

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">{room?.data.caption}</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <div className="room-content">
        <div className="room-carousel">
          <RoomDetailCarousel />
        </div>
        <div className="room-info">
          <div className="room-info__basic">
            <span className="room-info__desc text-regular">{room?.data.description}</span>
            <span className="room-info__location text-regular">{room?.data.location.city}</span>
            <span className="room-info__price text-regular">Price per night: <strong>{room?.data.pricePerNight} Kč</strong></span>
          </div>
          <div className="room-info__order-summary">
            <span className='room-info__order-summary__price text-semibold'>Final price: <strong>{totalPrice} Kč</strong></span>
            <Button variant="contained" className='book-room__button' onClick={tryToBookRoom}>
              Book the room
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomDetailPage;