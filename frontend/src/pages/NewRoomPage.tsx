import { FC } from 'react';
import { NewRoom } from '../models/roomTypes';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import NewRoomPhoto from '../components/NewRoomPhoto';
import { useMutation } from '@tanstack/react-query';
import { RoomsApi } from '../services';
import { useNavigate } from 'react-router-dom';


const NewRoomPage: FC = () => {
  const { mutate: createRoom } = useMutation({
    mutationFn: (body: NewRoom) => RoomsApi.createRoom(body),
    onSuccess: (res) => {
      console.log('New room created!');
      navigate(`/rooms/${res.data.id}`);
    }
  });

  const {register, handleSubmit} = useForm<NewRoom>();
  const onSubmit = (data: NewRoom) => createRoom(data);
  const navigate = useNavigate();

  const photos: any[] = ['x'];
  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">Add new room</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <form className='new-room-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          label="Caption"
          type='text'
          defaultValue=""
          { ...register('caption', { required: true })}
          className='form-textInput'
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          { ...register('description', { required: true })}
          className='form-textInput'
        />
        <TextField
          required
          label="Price per night"
          type='number'
          defaultValue=""
          { ...register('pricePerNight', { required: true })}
          className='form-textInput'
        />
        <TextField
          required
          label="City"
          type='text'
          defaultValue=""
          { ...register('location.city', { required: true })}
          className='form-textInput'
        />
        <TextField
          required
          label="Zip code"
          type='text'
          defaultValue=""
          { ...register('location.zip', { required: true })}
          className='form-textInput'
        />
        <TextField
          required
          label="Street"
          type='text'
          defaultValue=""
          { ...register('location.street', { required: true })}
          className='form-textInput'
        />
        <TextField
          required
          label="Country"
          type='text'
          defaultValue=""
          { ...register('location.country', { required: true })}
          className='form-textInput'
        />
        <input
          accept="image/*"
          className='form-button text-regular'
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          { ...register('images', { required: true })}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" className='form-button text-regular'>
            Add photos
          </Button>
        </label> 
        {/* <div className="form-photos">
          {photos.map((photo, index) => <NewRoomPhoto key={`photo-${index}`} />)}
        </div> */}
        <Button variant="contained" type='submit' className='form-button form-submit text-regular'>Add new room</Button>
      </form>
    </>
  );
}

export default NewRoomPage;