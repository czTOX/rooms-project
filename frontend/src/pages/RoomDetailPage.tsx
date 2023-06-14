import { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RoomDetailCarousel from '../components/RoomDetailCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BookingsApi, RoomsApi } from '../services';
import { NewBooking } from '../models';
import moment from 'moment';
import Moment from 'moment';
import { useRecoilValue } from 'recoil';
import { logedInAtom } from '../state/atoms';


const RoomDetailPage: FC = () => {
  const { id } = useParams();
  const logedIn = useRecoilValue(logedInAtom);
  
  const { data: room } = useQuery({
    queryKey: ['room', id],
    queryFn: () => RoomsApi.getSingle(id!),
    enabled: !!id,
  });

  const { mutate: bookRoom } = useMutation({
    mutationFn: (body: NewBooking) => BookingsApi.bookRoom(body),
    onSuccess: () => {
      console.log('User login successful!');
    }
  });

  function tryToBookRoom() {
    var body = {
      startDate: Moment(startDate).format('MM-DD-YYYY'),
      endDate: Moment(endDate).format('MM-DD-YYYY'),
      totalPrice: totalPrice,
    }
    if (logedIn) {
      bookRoom(body);
    } else {
      alert("You need to login first!")
    }
  }

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (endDate && room) {
      const diff = Moment(endDate).diff(Moment(startDate));
      const diffDuration = moment.duration(diff);
      if(diffDuration.days() > 0) {
        setTotalPrice(diffDuration.days() * room?.data.pricePerNight);
      }
    }
  }, [startDate, endDate]);

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
            <span className="room-info__location text-regular">{room?.data.locationId}</span>
            <span className="room-info__price text-regular">Price per night: <strong>{room?.data.pricePerNight} Kč</strong></span>
          </div>
          <div className="room-info__order-summary">
            <div className="room-info__order-summary__datepicker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From:"
                  className='DatePicker'
                  value={startDate}
                  onChange={(newValue) => {
                    if(newValue != null) setStartDate(newValue);
                  }}
                />
                <DatePicker
                  label="To:"
                  className='DatePicker'
                  value={endDate}
                  onChange={(newValue) => {
                    if(newValue != null) setEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
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