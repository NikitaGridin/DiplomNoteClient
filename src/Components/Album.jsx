import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import axios from "axios";
import ChangeAlbum from "./ChangeAlbum";
import h_f from "../assets/h_f.svg";
import h_e from "../assets/h_e.svg";

const Album = observer(({ album, deleteAlbum, addedAlbums, hidden }) => {
  const [modal, setModal] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(false);
  const id = userStore.userData.id;
  let nickname;
  if (album.User && album.User.nickname) {
    nickname = album.User.nickname;
  }
  if (album.author) {
    nickname = album.author;
  }
  const isAdminOrId1 =
    userStore.userData.role === "admin" ||
    userStore.userData.id === album.UserId;

  const deleteAlbumReq = async (e) => {
    e.preventDefault();
    if (window.confirm("Вы уверены что хотите удалить альбом?")) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}album/delete/${album.id}`
        );
        deleteAlbum(album.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeAlbum = async (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const getAddedAlbums = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}libray/addedAlbums/${
          userStore.userData.id
        }`
      );
      setIsAdded(data.includes(album.id));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const handleDeleteFromLibray = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}libray/deleteAlbum/${id}/${
          album.id
        }`
      );
      setIsAdded(false);
      if (hidden) {
        hidden(album.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAddedAlbums();
  }, [addedAlbums, album.id, id]);

  const handleAddToLibray = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}libray/addAlbum/${id}/${album.id}`
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
        className="w-6 mr-5 absolute bottom-20 -right-3 z-20"
      />
    </button>
  );
  return (
    <div
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer relative`}
    >
      {modal && <ChangeAlbum setModal={setModal} album={album} />}

      <Link to={`/album/${album.id}`}>
        <img
          className="rounded-lg w-full h-80 object-cover"
          src={import.meta.env.VITE_IMG_URL + album.img}
          alt=""
        />
        <div className="m-3">
          <div className="font-bold text-sm mb-2">{album.title}</div>
          <div className="text-sm font-light mb-2">{nickname}</div>
          <div className="text-[10px] font-light mb-2">
            {album.auditions} прослушиваний
          </div>
        </div>
      </Link>
      {userStore.isAuth && button}
      {isAdminOrId1 && (
        <div className="absolute bottom-2 right-2">
          <button
            className="rounded-xl text-white font-bold bg-blue-600 px-3 text-lg py-1 mr-2"
            onClick={(e) => changeAlbum(e)}
          >
            ...
          </button>
          <button
            className="rounded-xl text-white font-bold bg-red-600 px-3 text-lg py-1"
            onClick={(e) => deleteAlbumReq(e)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
});

export default Album;
