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
import Offer from '../components/Offer';


const RoomDetailPage: FC = () => {
  const { id } = useParams();
  const logedIn = useRecoilValue(logedInAtom);
  const filterDates = useRecoilValue(filterDatesAtom);
  const navigate = useNavigate();
  
  const { data: room } = useQuery({
    queryKey: ['getRoomOffers', id],
    queryFn: () => RoomsApi.getRoomOffers(id!),
    enabled: !!id,
  });

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
            <span className="room-info__location text-regular">{room?.data.location.city  + ', ' + room?.data.location.street}</span>
            <span className="room-info__price text-regular">Price per night: <strong>{room?.data.pricePerNight} Kč</strong></span>
          </div>
        </div>
      </div>
      <div className="room-offers">
        {room?.data.offers.map((offer, index) => <Offer key={`offer-${index}`} {...offer} />)}
      </div>
    </>
  );
}

export default RoomDetailPage;