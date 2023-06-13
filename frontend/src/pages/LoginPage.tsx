import { FC } from 'react';
import { useForm } from "react-hook-form";
import { UserLogin } from '../models';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../services';
import { logedInAtom } from '../state/atoms';
import { useSetRecoilState } from 'recoil';


const LoginPage: FC = () => {
  const setLogedIn = useSetRecoilState(logedInAtom);

  const { mutate: loginUser } = useMutation({
    mutationFn: (body: UserLogin) => UsersApi.loginUser(body),
    onSuccess: () => {
      console.log('User login successful!');
      setLogedIn(true);
      navigate(`/`);
    }
  });

  const {register, handleSubmit} = useForm<UserLogin>();
  const onSubmit = (data: UserLogin) => loginUser(data);
  const navigate = useNavigate();

  return (
    <>
      <div className="only-block__container">
        <div className="only-block">
          <h1 className="text-semibold">Login</h1>
          <div className="header-divider"></div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
              { ...register('hashedPassword', { required: true })}
              className='form-textInput'
            />
            <Link to='/registration' className='form__link text-regular'>I don't have a account yet!</Link>
            <Button variant="contained" type='submit' className='login-button'>Let me in!</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;