import { BrowserRouter, Routes, Route }from "react-router-dom";
import Main from "./Pages/Main";
import NoPage from './Pages/NoPage'
import Profile from './Pages/Profile'
import Header from './Components/Header'
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import React from 'react'
import axios from "axios";
import userStore from "./store/userStore";
import { observer } from "mobx-react-lite";
import Player from "./Components/Player";

const App = observer(() => {

     const checkAuth = async() =>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/refresh`, {withCredentials: true}); 
            localStorage.setItem('token', res.data.accesToken);
            userStore.setUser(res.data.user);
            getAddedTracks();
        } catch (error) {
            console.log(error);
        }
    }
    const getAddedTracks = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}libray/addedTracks/${userStore.userData.id}`);
          userStore.setTracks(data);
        } catch (error) {
          console.log(error?.response?.data);
        }
      };

    React.useEffect(()=>{
        if(localStorage.getItem('token')) checkAuth();
      },[]);

 return (
 <BrowserRouter>
 <div className="font-unbounded">
 <Header />
    <Routes>
        <Route path="/" element={<Main />} />
        {
            !userStore.isAuth &&
            <>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/login" element={<Login />} />
            </>
            
        }
        {
            userStore.isAuth &&
            <Route path="/profile" element={<Profile />} />
        }
        <Route path="*" element={<NoPage />} />
    </Routes>
    <Player />
    </div>
 </BrowserRouter>
 );
})

export default App;