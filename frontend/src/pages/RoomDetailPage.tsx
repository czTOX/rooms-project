import { FC } from 'react';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RoomDetailCarousel from '../components/RoomDetailCarousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function bookRoom() {
  return 
}

const RoomDetailPage: FC = () => {
  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">Title / Location</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <div className="room-content">
        <div className="room-carousel">
          <RoomDetailCarousel />
        </div>
        <div className="room-info">
          <div className="room-info__basic">
            <span className="room-info__location text-regular">Location: Here, there or something</span>
            <span className="room-info__beds text-regular">Number of beds: 4</span>
            <span className="room-info__price text-regular">Price per night: <strong>2 342 Kč</strong></span>
          </div>
          <div className="room-info__order-summary">
            <div className="room-info__order-summary__datepicker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From:"
                  className='DatePicker'
                />
                <DatePicker
                  label="To:"
                  className='DatePicker'
                />
              </LocalizationProvider>
            </div>
            <span className='room-info__order-summary__price text-semibold'>Final price: <strong>4 684 Kč / x night</strong></span>
            <Button variant="contained" className='book-room__button' onClick={bookRoom}>
              Book the room
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomDetailPage;