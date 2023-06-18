import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import axios from "axios";
import ChangeAlbum from "./ChangeAlbum";
import h_f from "../assets/h_f.svg";
import h_e from "../assets/h_e.svg";

const Album = observer(
  ({ album, deleteAlbum, addedAlbums, hidden, forAdmin }) => {
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
          className="w-10 mr-5 absolute top-3 -right-3 z-[5]"
        />
      </button>
    );

    const changeAlbumStatus = async (e, status) => {
      e.stopPropagation();
      if (window.confirm("Вы уверены что хотите изменит статус альбома?")) {
        try {
          const { data } = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}changeStatus/application`,
            {
              albumId: album.id,
              status: status,
            }
          );
          deleteAlbum(album.id);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <div
        className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer relative`}
      >
        {modal && <ChangeAlbum setModal={setModal} album={album} />}

        <Link to={`/album/${album.id}`}>
          <img
            className="rounded-lg w-full h-52 object-cover sm:h-80 lg:h-60"
            src={import.meta.env.VITE_IMG_URL + album.img}
            alt=""
          />
          <div className="m-3">
            <div className="font-bold text-xl mb-2 w-full truncate">
              {album.title}
            </div>
            <div className="text-lg font-light mb-2 w-full truncate">
              {nickname}
            </div>
            <div className="text-sm text-gray-600 font-light mb-2 w-full truncate">
              {album.type}
            </div>
            {!forAdmin && (
              <div className="text-[14px] text-gray-600 font-light mb-2 w-full truncate">
                Прослушиваний: {album.auditions ? album.auditions : 0}
              </div>
            )}
          </div>
        </Link>
        {userStore.isAuth && !forAdmin ? button : ""}

        {userStore.isAuth && isAdminOrId1 && !forAdmin && (
          <div className="absolute top-2 left-2">
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
        {userStore.userData.role === "admin" && forAdmin && (
          <div className="absolute bottom-2 right-2">
            <button
              className="rounded-xl text-white font-bold bg-green-600 px-3 text-lg py-1 mr-2"
              onClick={(e) => changeAlbumStatus(e, 2)}
            >
              ✓
            </button>
            <button
              className="rounded-xl text-white font-bold bg-red-600 px-3 text-lg py-1"
              onClick={(e) => changeAlbumStatus(e, 3)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default Album;
