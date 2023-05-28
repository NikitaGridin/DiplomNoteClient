import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import userStore from '../store/userStore'
import { useNavigate } from 'react-router-dom';

const Login = () => {
const navigate = useNavigate();
const [nickname,setNickname] = React.useState('');
const [password,setPassword] = React.useState('');

const handleChangeNickname = (e) => setNickname(e.target.value)
const handleChangePassword = (e) => setPassword(e.target.value)

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { nickname: nickname, password:password };
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/log-in`, data,{
        withCredentials: true
      });
      localStorage.setItem('token', res.data.accesToken);
      userStore.setUser(res.data.user)
      navigate('/profile', { replace: true });
    } catch (error) {
        alert(error?.response?.data);
    }
  };
  

  return (
    <div>
     {userStore.isAuth &&
        <Navigate to='/profile' />
     }
    {!userStore.isAuth &&
      <>
          <form action="">
              <h1>Форма авторизации</h1>
              <input type="text" placeholder='Nickname' value={nickname} onChange={(e)=>handleChangeNickname(e)}/>
              <input type="text" placeholder='Password' value={password} onChange={(e)=>handleChangePassword(e)}/>
              <button onClick={(e)=>handleSubmit(e)}>Войти</button>
          </form>
          <Link to={'/signIn'}>Ещё не зарегестрированы?</Link>
      </>
    }
 </div>
  )
}

export default Login