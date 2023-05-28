import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore'

const SignIn = () => {

  const navigate = useNavigate();
  
const [name,setName] = React.useState('');
const [email,setEmail] = React.useState('');
const [password,setPassword] = React.useState('');
const [passwordRepeat,setPasswordRepeat] = React.useState('');
const [img,setImg] = React.useState(null);

const [submit,setSubmit] = React.useState(false);
const [activeCode, setActiveCode] = React.useState('');

const handleChangeName = (e) => setName(e.target.value)
const handleChangeEmail = (e) => setEmail(e.target.value)
const handleChangePassword = (e) => setPassword(e.target.value)
const handleChangePasswordRepeat = (e) => setPasswordRepeat(e.target.value)
const handleChangeImg = (e) => setImg(e.target.files[0])

const handleChangeActiveCode = (e) => setActiveCode(e.target.value)

const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("nickname", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_repeat", passwordRepeat);
      formData.append("img", img);
  
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/sign-in`, formData,{
        withCredentials: true
      });
      alert("На вашу почту отправлен код подтверждения!")
      setSubmit(true)
    } catch (error) {
        alert(error?.response?.data);
    }
  };
  
  const handleSubmiActiveCode = async (e) => {
    e.preventDefault();
    try {
      const data = { code: activeCode };
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/activate`, data);
      alert("Регистрация прошла успешно!");
      localStorage.setItem('token', res.data.accesToken);
      userStore.setUser(res.data.user)
      navigate('/profile', { replace: true });
    } catch (error) {
        alert(error?.response?.data);
    }
  };
  return (
    <div>
        <form action="">
            <h1>Форма регистрации</h1>
            <input type="text" placeholder='Имя' value={name} onChange={(e)=>handleChangeName(e)}/>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>handleChangeEmail(e)}/>
            <input type="text" placeholder='Password' value={password} onChange={(e)=>handleChangePassword(e)}/>
            <input type="text" placeholder='Password' value={passwordRepeat} onChange={(e)=>handleChangePasswordRepeat(e)}/>
            <input type="file" placeholder='Img' onChange={(e)=>handleChangeImg(e)}/>
            {submit &&
            <>
                <input type="text" placeholder='Код активации' value={activeCode} onChange={(e)=>handleChangeActiveCode(e)}/>
                <button onClick={(e)=>handleSubmiActiveCode(e)}>Отправить код</button>
            </>
            }
            {!submit &&
                <button onClick={(e)=>handleSubmit(e)}>Отправить</button>
            }
        </form>
    </div>
  )
}

export default SignIn