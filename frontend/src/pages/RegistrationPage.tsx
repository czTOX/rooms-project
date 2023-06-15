import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserRegistraion } from '../models';
import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../services';
import { useSetRecoilState } from 'recoil';
import { logedInAtom } from '../state/atoms';


const RegistrationPage: FC = () => {
  const setLogedIn = useSetRecoilState(logedInAtom);

  const { mutate: registerUser } = useMutation({
    mutationFn: (body: UserRegistraion) => UsersApi.registerUser(body),
    onSuccess: () => {
      console.log('User registration successful!');
      setLogedIn(true);
      navigate(`/`)
    }
  });

  const {register, handleSubmit} = useForm<UserRegistraion>();
  const onSubmit = (data: UserRegistraion) => registerUser(data);
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
              label="First name"
              type='text'
              defaultValue=""
              { ...register('firstName', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              label="Last name"
              type='text'
              defaultValue=""
              { ...register('lastName', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              label="Phone number"
              type='phone'
              defaultValue=""
              { ...register('phoneNumber', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              label="Email"
              type='email'
              defaultValue=""
              { ...register('email', { required: true })}
              className='form-textInput'
            />
            <TextField
              required
              label="Password"
              type='password'
              defaultValue=""
              { ...register('hashedPassword', { required: true })}
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