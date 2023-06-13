import { FC, useState } from 'react';
import RoomSimpleView from '../components/RoomSimpleView';
import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';


const RoomsPage: FC = () => {
  const rooms: any[] = ['x'];

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">Available rooms</h1>
          <div className="page-header__divider"></div>
        </header>
        <div className="searchBox">
          <TextField
            id="outlined-basic"
            label="Search here"
            variant="outlined"
          />
        </div>
      </div>
      <div className="filter">
      <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          className='filter__item'
        />
        <div className="filter__price">
          <TextField
            id="outlined-basic"
            label="Min. price"
            variant="outlined"
            className='filter__item'
          />
          <TextField
            id="outlined-basic"
            label="Max. price"
            variant="outlined"
            className='filter__item'
          />
        </div>
        <div className="filter__date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date from:"
                className='filter__item'
              />
              <DatePicker
                label="Date to:"
                className='filter__item'
              />
          </LocalizationProvider>
        </div>
        <Button variant="contained" type='submit' className='filter__submit filter__item'>Filter</Button>
      </div>
      <div className="sort">
        <span className="sort__title text-semibold">Sort by:</span>
        <div className="sort-options">
          <button className="sort__item text-semibold">Cheapest</button>
          <button className="sort__item sort__item--selected text-semibold">Most expensive</button>
          <button className="sort__item text-semibold">Closest</button>
        </div>
      </div>
      <div className="content-divider"></div>
      <div className="rooms">
        {rooms.map(() => <RoomSimpleView />)}
      </div>
    </>
  );
}

export default RoomsPage;