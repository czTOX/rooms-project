import { FC } from 'react';
import { NewRoomForm } from '../models/roomTypes';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import NewRoomPhoto from '../components/NewRoomPhoto';


const NewRoomPage: FC = () => {
  const {register, handleSubmit} = useForm<NewRoomForm>();
  const onSubmit = (data: NewRoomForm) => console.log(data);

  const photos: any[] = ['x'];
  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">Add new room</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <form className='new-room-form'>
        <TextField
          required
          id="outlined-required"
          label="Caption"
          type='text'
          defaultValue=""
          { ...register('caption', { required: true })}
          className='form-textInput'
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          { ...register('description', { required: true })}
          className='form-textInput'
        />
        <TextField
          required
          id="outlined-required"
          label="Price per night"
          type='number'
          defaultValue=""
          { ...register('pricePerNight', { required: true })}
          className='form-textInput'
        />
        <Button variant="contained" type='submit' className='form-button text-regular'>Add more photos</Button>
        <div className="form-photos">
          {photos.map(() => <NewRoomPhoto />)}
        </div>
        <Button variant="contained" type='submit' className='form-submit form-button text-regular'>Add new room</Button>
      </form>
    </>
  );
}

export default NewRoomPage;