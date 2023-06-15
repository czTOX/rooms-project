import { FC, useEffect, useState } from 'react';
import RoomSimpleView from '../components/RoomSimpleView';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LocationApi, RoomsApi } from '../services';
import { useForm } from 'react-hook-form';
import { Filter, Room } from '../models';
import { useSetRecoilState } from 'recoil';
import { filterDatesAtom } from '../state/atoms';


const RoomsPage: FC = () => {
  const { mutate: filterRooms } = useMutation({
    mutationFn: (body: Filter) => RoomsApi.getFiltered({...body}),
    onSuccess: (res) => {
      setRooms(res.data);
    }
  });

  const { data: locations } = useQuery({
    queryKey: ['getLocations'],
    queryFn: () => LocationApi.getAll(),
  });

  const [location, setLocation] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const setFilterDates = useSetRecoilState(filterDatesAtom);

  const {register, handleSubmit} = useForm<Filter>();
  const onSubmit = (data: Filter) => {
    data.startDate = startDate ? startDate.toISOString() : "";
    data.endDate = endDate ? endDate.toISOString() : "";
    data.location = location;
    data.sort = sort;
    filterRooms(data);
  };
  const [rooms, setRooms] = useState<Array<Room>>();

  const cities = [...new Set(locations?.data.map(q => q.city))];

  useEffect(() => {
    setFilterDates({startDate, endDate})
  }, [startDate, endDate]);

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
        <FormControl className='filter__item' sx={{width: 224}}>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={location}
            label="Location"
            onChange={(newValue) => {
              if(newValue != null) setLocation(newValue.target.value);
            }}
            className='filter__item'
          >
            <MenuItem value={''} key={'noCity'}>---</MenuItem>
            {cities.map((city) => <MenuItem value={city} key={city}>{city}</MenuItem>)}
          </Select>
        </FormControl>
        <div className="filter__price">
          <TextField
            label="Min. price"
            variant="outlined"
            className='filter__item'
            { ...register('minPrice') }
          />
          <TextField
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
        <div className="sort">
          <span className="sort__title text-semibold">Sort by:</span>
          <div className="sort-options">
            <button className={`sort__item text-semibold ${sort == 'priceAsc' ? 'sort__item--selected' : ''}`} onClick={() => {event?.preventDefault();setSort('priceAsc')}}>Cheapest</button>
            <button className={`sort__item text-semibold ${sort == 'priceDesc' ? 'sort__item--selected' : ''}`} onClick={() => {event?.preventDefault();setSort('priceDesc')}}>Most expensive</button>
          </div>
        </div>
        <Button variant="contained" type='submit' className='filter__submit filter__item'>Show</Button>
      </form>
      <div className="content-divider"></div>
      <div className="rooms">
        {rooms?.map((room) => <RoomSimpleView key={room.id} {...room} />)}
      </div>
    </>
  );
}

export default RoomsPage;