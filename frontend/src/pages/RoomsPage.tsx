import { FC, useState } from 'react';
import RoomSimpleView from '../components/RoomSimpleView';
import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { RoomsApi } from '../services';
import { useForm } from 'react-hook-form';
import { Filter, FilterWithoutDate, Room } from '../models';


const RoomsPage: FC = () => {
  const { mutate: filterRooms } = useMutation({
    mutationFn: (body: FilterWithoutDate) => RoomsApi.getFiltered({...body, startDate, endDate}),
    onSuccess: (res) => {
      console.log('User registration successful!');
      setRooms(res.data);
    }
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {register, handleSubmit} = useForm<FilterWithoutDate>();
  const onSubmit = (data: FilterWithoutDate) => filterRooms(data);
  const [rooms, setRooms] = useState<Array<Room>>();

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">Available rooms</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <form className="filter" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          className='filter__item'
          { ...register('search') }
        />
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          className='filter__item'
          { ...register('location') }
        />
        <div className="filter__price">
          <TextField
            id="outlined-basic"
            label="Min. price"
            variant="outlined"
            className='filter__item'
            { ...register('minPrice') }
          />
          <TextField
            id="outlined-basic"
            label="Max. price"
            variant="outlined"
            className='filter__item'
            { ...register('maxPrice') }
          />
        </div>
        <div className="filter__date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date from:"
                className='filter__item'
                value={startDate}
                onChange={(newValue) => {
                  if(newValue != null) setStartDate(newValue);
                }}
              />
              <DatePicker
                label="Date to:"
                className='filter__item'
                value={endDate}
                onChange={(newValue) => {
                  if(newValue != null) setEndDate(newValue);
                }}
              />
          </LocalizationProvider>
        </div>
        <div className="sort">
          <span className="sort__title text-semibold">Sort by:</span>
          <div className="sort-options">
            <button className="sort__item text-semibold">Cheapest</button>
            <button className="sort__item sort__item--selected text-semibold">Most expensive</button>
            <button className="sort__item text-semibold">Closest</button>
          </div>
        </div>
        <Button variant="contained" type='submit' className='filter__submit filter__item'>Show</Button>
      </form>
      <div className="content-divider"></div>
      <div className="rooms">
        {rooms?.map((room) => <RoomSimpleView {...room} />)}
      </div>
    </>
  );
}

export default RoomsPage;