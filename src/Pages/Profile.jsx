import React from 'react'
import userStore from '../store/userStore'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/logout`,{}, {
        withCredentials: true,
      });
      localStorage.removeItem('token'); 
      userStore.logout();
      navigate('/', { replace: true });
    } catch (error) {    
      alert(error?.response?.data);
    }
  };

  return (
    <div>
      <img className='w-96 h-96 object-cover rounded-2xl' src={`${import.meta.env.VITE_IMG_URL+userStore.userData.img}`} alt="" />
      
      <div onClick={()=>logout()}>Выйти</div>
      </div>
  )
}

export default Profile