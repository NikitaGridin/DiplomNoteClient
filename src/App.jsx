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
import Search from './Pages/Search'
import Playlists from "./Pages/Playlists";
import NewRelease from "./Pages/NewRelease";
import Libray from "./Pages/Libray";
import AuthorPage from "./Pages/AuthorPage";

const App = observer(() => {

     const checkAuth = async() =>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/refresh`, {withCredentials: true}); 
            localStorage.setItem('token', res.data.accesToken);
            userStore.setUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    }
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
            <Route path="/playlists" element={<Playlists />} />
        {
            userStore.isAuth &&
            <Route path="/profile" element={<Profile />} />
        }
        <Route path="*" element={<NoPage />} />
        <Route path="/newRelease" element={<NewRelease />} />
        <Route path="/libray" element={<Libray />} />
        <Route path="/search" element={<Search />} />
        <Route path="/author/:id" element={<AuthorPage />} />
    </Routes>
    <Player />
  
    </div>
 </BrowserRouter>
 );
})

export default App;