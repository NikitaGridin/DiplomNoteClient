import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import PopupTrack from "./PopupTrack";

import userStore from "../store/userStore";
import currentTrackStore from "../store/currentTrackStore";

import { addedTracksReq } from "../fetch/get";
import { deleteFromLibrayReq, deleteTrackReq } from "../fetch/delete";
import { addToLibrayReq, auditionReq } from "../fetch/post";
import { changeCoauthorStatus } from "../fetch/put";

import Succes from "../assets/succes.svg";
import Cancel from "../assets/cancel.svg";
import Delete from "../assets/delete.svg";
import h_f from "../assets/h_f.svg";
import h_e from "../assets/h_e.svg";
import P_block from "../assets/p_block.svg";
import Pa_block from "../assets/pa_block.svg";
import Points from "../assets/points.svg";

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
        hidden,
        trackId,
        setIsAdded
      );
    };

    const handleAddToLibray = async (e) => {
      e.stopPropagation();
      addToLibrayReq(
        `${import.meta.env.VITE_BACKEND_URL}libray/addTrack`,
        userStore.userData.id,
        trackId,
        setIsAdded
      );
    };

    const handleDelete = async (e) => {
      e.stopPropagation();
      if (window.confirm("Вы уверены что хотите удалить трек?")) {
        deleteTrackReq(
          `${import.meta.env.VITE_BACKEND_URL}track/delete/${trackId}`,
          delOn,
          trackId,
          setIsAdded
        );
      }
    };
    const accept = async (e) => {
      e.stopPropagation();
      if (window.confirm("Вы уверены что хотите участвовать в треке?")) {
        changeCoauthorStatus(
          `${import.meta.env.VITE_BACKEND_URL}changeStatus/track`,
          userStore.userData.id,
          trackId,
          2,
          setAction,
          action,
          delOn
        );
      }
    };
    const cancel = async (e) => {
      e.stopPropagation();
      if (window.confirm("Вы уверены что не хотите участвовать в треке?")) {
        changeCoauthorStatus(
          `${import.meta.env.VITE_BACKEND_URL}changeStatus/track`,
          userStore.userData.id,
          trackId,
          3,
          setAction,
          action,
          delOn
        );
      }
    };

    const button = (
      <button onClick={isAdded ? handleDeleteFromLibray : handleAddToLibray}>
        <img src={isAdded ? h_f : h_e} className="w-6 mr-3" />
      </button>
    );

    const delButton = (
      <button onClick={(e) => handleDelete(e)}>
        <img src={Delete} className="w-5 ml-6" />
      </button>
    );

    const buttonAccept = (
      <button onClick={(e) => accept(e)}>
        <img src={Succes} className="w-8 mr-2" />
      </button>
    );

    const buttonCancel = (
      <button onClick={(e) => cancel(e)}>
        <img src={Cancel} className="w-8" />
      </button>
    );

    return (
      <div
        className={`flex py-2 px-3 justify-between shadow-lg border rounded-lg relative items-center cursor-pointer hover:border-yellow-400 transition-all xl:px-5 ${
          currentTrackStore.currentTrack.id === trackId
            ? "border-yellow-400"
            : ""
        }`}
        onClick={() => playTrack()}
      >
        <div className="flex items-center">
          <div className="mr-3 xl:mr-5">{num}</div>
          <div>
            {currentTrackStore.currentTrack.id === trackId && (
              <div className="absolute">
                {currentTrackStore.isPlaying ? (
                  <img
                    src={Pa_block}
                    alt=""
                    className="w-14 object-cover rounded-xl mr-3 sm:w-16"
                  />
                ) : (
                  <img
                    src={P_block}
                    alt=""
                    className="w-14 object-cover rounded-xl mr-3 sm:w-16"
                  />
                )}
              </div>
            )}
            <img
              className="w-14 object-cover rounded-xl mr-3 sm:w-16"
              src={img}
              alt=""
            />
          </div>
          <div className="">
            <div className="font-bold text-lg mb-1 truncate w-20  sm:w-full">
              {title}
            </div>
            <div className="font-normal text-xs truncate w-20 sm:w-full">
              <Link
                className="mr-2"
                to={`/author/${authorId}`}
                onClick={(e) => e.stopPropagation()}
              >
                {authorNickname}
              </Link>
              {coautors.map((e, i) => (
                <Link
                  key={i}
                  to={`/author/${e.User.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {e.User.nickname}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {!wait && userStore.isAuth && (
            <div className="flex">
              {userStore.isAuth && button}
              <div onClick={(e) => handlePopupTrack(e)}>
                <img src={Points} />
              </div>
              {popup && <PopupTrack onClose={setPopup} trackId={trackId} />}
            </div>
          )}
          {wait && (
            <div>
              {buttonAccept}
              {buttonCancel}
            </div>
          )}
          {(authorId === userStore.userData.id ||
            userStore.userData.role === "admin") &&
            delButton}
        </div>
      </div>
    );
  }
);

export default Track;
