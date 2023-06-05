import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import NoPage from "./Pages/NoPage";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import React from "react";
import axios from "axios";
import userStore from "./store/userStore";
import { observer } from "mobx-react-lite";
import Player from "./Components/Player";
import Search from "./Pages/Search";
import AllPlaylists from "./Pages/allPlaylists";
import AllAlbums from "./Pages/AllAlbums";
import Libray from "./Pages/Libray";
import AuthorPage from "./Pages/AuthorPage";
import AllTracks from "./Pages/AllTracks";
import AllGenres from "./Pages/AllGenres";
import currentTrackStore from "./store/currentTrackStore";
import AddAlbums from "./Pages/AddAlbums";
import AlbumPage from "./Pages/AlbumPage";
import AllAuthors from "./Pages/AllAuthors";
import GenrePage from "./Pages/GenrePage";

const App = observer(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}auth/refresh`,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.accesToken);
      userStore.setUser(res.data.user);
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className="font-unbounded">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          {!userStore.isAuth && (
            <>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          {userStore.isAuth && (
            <Route path="/addAlbum" element={<AddAlbums />} />
          )}
          <Route path="/allPlaylists" element={<AllPlaylists />} />
          <Route path="/libray" element={<Libray />} />
          <Route path="/allAlbums" element={<AllAlbums />} />
          <Route path="/alltracks" element={<AllTracks />} />
          <Route path="/allGenres" element={<AllGenres />} />
          <Route path="/allAuthors" element={<AllAuthors />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        {currentTrackStore.playerActive && <Player />}
      </div>
    </BrowserRouter>
  );
});

export default App;
