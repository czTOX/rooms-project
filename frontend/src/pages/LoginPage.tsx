import { FC } from 'react';
import { useForm } from "react-hook-form";
import { UserLogin } from '../models';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const LoginPage: FC = () => {

  const {register, handleSubmit} = useForm<UserLogin>();
  const onSubmit = (data: UserLogin) => console.log(data);
  //const navigate = useNavigate();

  return (
    <>
      <div className="only-block__container">
        <h1>Login</h1>
        <div className="header-divider"></div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
            { ...register('email', { required: true })}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
            { ...register('hashedPassword', { required: true })}
          />
          <Button variant="contained" type='submit'>Login</Button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;