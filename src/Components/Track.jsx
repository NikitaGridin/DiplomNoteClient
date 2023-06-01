import React from "react";
import h_f from "../assets/h_f.svg";
import h_e from "../assets/h_e.svg";
import P_block from "../assets/p_block.svg";
import Pa_block from "../assets/pa_block.svg";
import PopupTrack from "./PopupTrack";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import currentTrackStore from "../store/currentTrackStore";
import { observer } from "mobx-react-lite";
import { addedTracksReq } from "../fetch/get";
import { deleteFromLibrayReq, deleteTrackReq } from "../fetch/delete";
import { addToLibrayReq, auditionReq } from "../fetch/post";
import { changeCoauthorStatus } from "../fetch/put";

const Track = observer(
  ({
    num,
    addedTracks,
    delOn,
    url,
    img,
    title,
    authorId,
    authorNickname,
    coautors,
    trackId,
    wait,
    hidden,
    userConfirm,
  }) => {
    const [isAdded, setIsAdded] = React.useState(false);
    const [popup, setPopup] = React.useState(false);
    const [action, setAction] = React.useState(false);
    const id = userStore.userData.id;

    const handlePopupTrack = (e) => {
      e.stopPropagation();
      setPopup(!popup);
    };

    const getAddedTracks = async () => {
      addedTracksReq(
        `libray/addedTracks/${userStore.userData.id}`,
        setIsAdded,
        trackId
      );
    };

    React.useEffect(() => {
      getAddedTracks();
    }, [addedTracks, trackId, id]);

    const handleAddAudition = async () => {
      auditionReq(userStore.userData.id, trackId);
    };

    const playTrack = async () => {
      if (userStore.userData.id) {
        handleAddAudition();
      }
      if (currentTrackStore.currentTrack.id === trackId) {
        currentTrackStore.togglePlayPause();
      } else {
        currentTrackStore.setCurrentTrack({
          id: trackId,
          url: url,
          img: img,
          title: title,
          authorId: authorId,
          authorNickname: authorNickname,
          coautors: coautors,
        });
        currentTrackStore.setCurrentTime(0);
      }
    };

    const handleDeleteFromLibray = async (e) => {
      e.stopPropagation();
      deleteFromLibrayReq(
        `${import.meta.env.VITE_BACKEND_URL}libray/deleteTrack/${
          userStore.userData.id
        }/${trackId}`,
        trackId,
        hidden,
        setIsAdded
      );
    };

    const handleAddToLibray = async (e) => {
      e.stopPropagation();
      addToLibrayReq(
        `${import.meta.env.VITE_BACKEND_URL}libray/addTrack`,
        1,
        trackId,
        setIsAdded
      );
    };

    const handleDelete = async (e) => {
      e.stopPropagation();
      deleteTrackReq(
        `${import.meta.env.VITE_BACKEND_URL}track/delete/${trackId}`,
        delOn,
        trackId,
        setIsAdded
      );
    };
    const accept = async (e) => {
      e.stopPropagation();
      changeCoauthorStatus(
        `${import.meta.env.VITE_BACKEND_URL}changeStatus/track`,
        userStore.userData.id,
        trackId,
        2,
        setAction,
        action,
        delOn
      );
    };
    const cancel = async (e) => {
      e.stopPropagation();
      changeCoauthorStatus(
        `${import.meta.env.VITE_BACKEND_URL}changeStatus/track`,
        userStore.userData.id,
        trackId,
        3,
        setAction,
        action,
        delOn
      );
    };

    const button = isAdded ? (
      <button onClick={(e) => handleDeleteFromLibray(e)}>
        <img src={h_f} className="w-6 mr-5" />
      </button>
    ) : (
      <button onClick={(e) => handleAddToLibray(e)}>
        <img src={h_e} className="w-6 mr-5" />
      </button>
    );

    const delButton =
      authorId === userStore.userData.id ||
      userStore.userData.role === "admin" ? (
        <button onClick={(e) => handleDelete(e)}>Удалить</button>
      ) : (
        ""
      );

    const buttonAccept = (
      <button onClick={(e) => accept(e)}>Подтвердить</button>
    );
    const buttonCancel = <button onClick={(e) => cancel(e)}>Отменить</button>;

    return (
      <div
        className={`flex py-2 px-5 justify-between shadow-lg border rounded-lg relative items-center cursor-pointer hover:border-yellow-400 transition-all ${
          currentTrackStore.currentTrack.id === trackId
            ? "border-yellow-400"
            : ""
        }`}
        onClick={() => playTrack()}
      >
        <div className="flex items-center">
          <div className="mr-5">{num}</div>
          <div>
            {currentTrackStore.currentTrack.id === trackId && (
              <div className="absolute">
                {currentTrackStore.isPlaying ? (
                  <img src={Pa_block} alt="" />
                ) : (
                  <img src={P_block} alt="" />
                )}
              </div>
            )}
            <img
              className="w-12 h-12 object-cover rounded-xl mr-5"
              src={img}
              alt=""
            />
          </div>
          <div>
            <div className="font-bold text-lg mb-1">{title}</div>
            <div className="font-normal text-xs">
              <Link className="mr-2">{authorNickname}</Link>
              {coautors.map((e, i) => (
                <Link key={i}>{e.User.nickname}</Link>
              ))}
            </div>
          </div>
        </div>
        {delButton}
        {!wait && (
          <div className="flex items-center">
            {userStore.isAuth && button}
            <div onClick={(e) => handlePopupTrack(e)}>...</div>
            {popup && <PopupTrack onClose={setPopup} />}
          </div>
        )}
        {wait && buttonAccept}
        {wait && buttonCancel}
      </div>
    );
  }
);

export default Track;
