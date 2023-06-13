import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserRegistraion } from '../models';


const RegistrationPage: FC = () => {
  const {register, handleSubmit} = useForm<UserRegistraion>();
  const onSubmit = (data: UserRegistraion) => console.log(data);
  const navigate = useNavigate();

  return (
    <>
      <div className="only-block__container">
        <div className="only-block">
          <h1 className="text-semibold">Registration</h1>
          <div className="header-divider"></div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              id="outlined-required"
              label="First name"
              type='text'
              defaultValue=""
              { ...register('firstName', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              id="outlined-required"
              label="Last name"
              type='text'
              defaultValue=""
              { ...register('lastName', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              id="outlined-required"
              label="Phone number"
              type='phone'
              defaultValue=""
              { ...register('phoneNumber', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              type='email'
              defaultValue=""
              { ...register('email', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type='password'
              defaultValue=""
              { ...register('password', { required: true })}
              className='form-textInput'
            />
            <Button variant="contained" type='submit' className='login-button text-regular'>Register</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;