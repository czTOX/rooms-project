import { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RoomDetailCarousel from '../components/RoomDetailCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BookingsApi, LocationApi, RoomsApi } from '../services';
import { NewBooking, Offer } from '../models';
import moment from 'moment';
import Moment from 'moment';
import { useRecoilValue } from 'recoil';
import { filterDatesAtom, logedInAtom } from '../state/atoms';
import { useForm } from 'react-hook-form';
import { Carousel } from 'react-responsive-carousel';


const RoomDetailPage: FC = () => {
  const { id } = useParams();
  const logedIn = useRecoilValue(logedInAtom);
  const navigate = useNavigate();
  
  const { data: room } = useQuery({
    queryKey: ['getRoomOffers', id],
    queryFn: () => RoomsApi.getRoomOffers(id!),
    enabled: !!id,
  });

  const { mutate: offerRoom } = useMutation({
    mutationFn: (body: Offer) => RoomsApi.offerRoom(body, id!),
    onSuccess: () => {
      alert("Offer was successful");
      navigate('/my-rooms');
    }
  });

  function tryToOfferRoom() {
    var body = {
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    }
    if (logedIn) {
      offerRoom(body);
    } else {
      alert("You need to login first!")
    }
  }

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {register, handleSubmit} = useForm();

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">Offer: {room?.data.caption}</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <div className="room-content">
        <div className="room-carousel">
          <Carousel showArrows={true} swipeable={true} showStatus={false} dynamicHeight={false}>
            {room?.data.photosUrls.split(';').map((url) => {
              return (
                <div>
                  <img src={url} alt={`photo-${url}`} />
                </div>
              )
            })}
          </Carousel>
        </div>
        <div className="room-info">
          <div className="room-info__basic">
            <span className="room-info__desc text-regular">{room?.data.description}</span>
            <span className="room-info__location text-regular">{room?.data.location.city + ', ' + room?.data.location.street}</span>
            <span className="room-info__price text-regular">Price per night: <strong>{room?.data.pricePerNight} Kč</strong></span>
          </div>
          <form className="room-info__order-summary" onSubmit={handleSubmit(tryToOfferRoom)}>
            <div className="filter__date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date from:"
                  className='filter__item'
                  value={startDate}
                  onChange={(newValue) => {
                  if(newValue != null) setStartDate(new Date(newValue));
                  }}
                  slotProps={{
                    textField: {
                        required: true,
                    },
                  }}
                />
                <DatePicker
                  label="Date to:"
                  className='filter__item'
                  value={endDate}
                  onChange={(newValue) => {
                  if(newValue != null) setEndDate(new Date(newValue));
                  }}
                  slotProps={{
                    textField: {
                        required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <Button variant="contained" className='book-room__button' type='submit'>
              Offer a room
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RoomDetailPage;