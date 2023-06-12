import React from "react";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import { observer } from "mobx-react-lite";
import ChangeGenre from "./ChangeGenre";
import axios from "axios";
import h_f from "../assets/h_f.svg";
import h_e from "../assets/h_e.svg";

const Playlist = observer(({ playlist, deletePlaylist }) => {
  const [modal, setModal] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(false);

  const getAddedPlaylists = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}libray/addedPlaylist/${
          userStore.userData.id
        }`
      );
      setIsAdded(data.includes(playlist.id));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const deleteGenre = async (e) => {
    e.preventDefault();
    if (window.confirm("Вы уверены что хотите удалить плейлист?")) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}playlist/delete/${playlist.id}`
        );
        deletePlaylist(playlist.id);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const changeGenre = async (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  const handleDeleteFromLibray = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}libray/deletePlaylist/${
          userStore.userData.id
        }/${playlist.id}`
      );
      setIsAdded(false);
      // if (hidden) {
      //   hidden(album.id);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToLibray = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}libray/addPlaylist/${
          userStore.userData.id
        }/${playlist.id}`
      );
      setIsAdded(true);
    } catch (error) {
      console.log(error);
    }
  };
  const button = (
    <button onClick={isAdded ? handleDeleteFromLibray : handleAddToLibray}>
      <img
        src={isAdded ? h_f : h_e}
        className="w-6 absolute bottom-14 right-3 z-20"
      />
    </button>
  );
  React.useEffect(() => {
    if (userStore.userData.id) {
      getAddedPlaylists();
    }
  }, [userStore.userData.id]);
  return (
    <div
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer relative`}
    >
      {modal && (
        <ChangeGenre
          setModal={setModal}
          genre={playlist}
          url={"playlist/update"}
        />
      )}
      <Link to={`/playlist/${playlist.id}`}>
        {userStore.userData.id &&
          userStore.userData.id === playlist.User.id && (
            <div className="h-6 w-6 rounded-full bg-green-500 absolute top-4 right-4"></div>
          )}
        <img
          className="rounded-lg w-full h-80 object-cover"
          src={import.meta.env.VITE_IMG_URL + playlist.img}
          alt=""
        />
        <div className="m-3">
          <div className="font-bold text-sm mb-2">{playlist.title}</div>
          <div className="text-sm font-light mb-2">
            {playlist.User.nickname}
          </div>
        </div>
      </Link>
      {userStore.isAuth && playlist.User.id != userStore.userData.id && button}

      {userStore.userData.role === "admin" ||
      userStore.userData.id === playlist.User.id ? (
        <div className="absolute bottom-2 right-2">
          <button
            className="rounded-xl text-white font-bold bg-blue-600 px-3 text-lg py-1 mr-2"
            onClick={(e) => changeGenre(e)}
          >
            ...
          </button>
          <button
            className="rounded-xl text-white font-bold bg-red-600 px-3 text-lg py-1"
            onClick={(e) => deleteGenre(e)}
          >
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
});

export default Playlist;
