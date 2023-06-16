import { observer } from "mobx-react-lite";
import currentTrackStore from "../store/currentTrackStore";
import React from "react";
import Play from "../assets/play.svg";
import Pause from "../assets/pause.svg";
import Prev from "../assets/prev.svg";
import Next from "../assets/next.svg";
import Repeat_d from "../assets/repeat_d.svg";
import Repeat_a from "../assets/repeat_a.svg";
import Volume from "../assets/vol.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const Player = observer(() => {
  const audioRef = React.useRef();
  const volumeRef = React.useRef();
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [modalVolume, setModalVolume] = React.useState(false);
  const [message, setMessage] = React.useState();

  const togglePlayPause = () => {
    currentTrackStore.togglePlayPause();
    const isPlaying = currentTrackStore.isPlaying;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      currentTrackStore.setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  const handleVolumeChange = () => {
    audioRef.current.volume = volumeRef.current.value;
  };

  const handleCurrentTime = (e) => {
    const currentTime = e.target.value;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
  };
  function currentTrackEnded() {
    if (currentTrackStore.repeat) {
      const currentTime = (audioRef.current.currentTime = 0);
      setCurrentTime(currentTime);
      audioRef.current.play();
    } else {
      handleNext();
    }
  }
  React.useEffect(() => {
    audioRef.current.addEventListener("ended", currentTrackEnded);
    return () => {
      audioRef.current.removeEventListener("ended", currentTrackEnded);
    };
  }, []);

  const handleRepeat = () => {
    currentTrackStore.toggleRepeat();
  };

  const handlePrev = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}track/one/${
          currentTrackStore.currentTrack.id - 1
        }`
      );
      if (!data.length) {
        currentTrackStore.togglePlayPause();
        audioRef.current.pause();
        currentTrackStore.setCurrentTime(0);
        setMessage("Треки закончились!");
        setTimeout(function () {
          setMessage("");
        }, 2000);
      } else {
        currentTrackStore.setCurrentTrack({
          id: data[0].id,
          url: import.meta.env.VITE_AUDIO_URL + data[0].audio,
          img: import.meta.env.VITE_IMG_URL + data[0].Album.img,
          title: data[0].title,
          authorId: data[0].Album.User.id,
          authorNickname: data[0].Album.User.nickname,
          coautors: data[0].CoauthorAlias,
        });
        currentTrackStore.setCurrentTime(0);
        audioRef.current.play();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleNext = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}track/one/${
          currentTrackStore.currentTrack.id + 1
        }`
      );
      if (!data.length) {
        currentTrackStore.togglePlayPause();
        audioRef.current.pause();
        currentTrackStore.setCurrentTime(0);
        setMessage("Треки закончились!");
        setTimeout(function () {
          setMessage("");
        }, 2000);
      } else {
        currentTrackStore.setCurrentTrack({
          id: data[0].id,
          url: import.meta.env.VITE_AUDIO_URL + data[0].audio,
          img: import.meta.env.VITE_IMG_URL + data[0].Album.img,
          title: data[0].title,
          authorId: data[0].Album.User.id,
          authorNickname: data[0].Album.User.nickname,
          coautors: data[0].CoauthorAlias,
        });
        currentTrackStore.setCurrentTime(0);
        audioRef.current.play();
      }
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    const { currentTrack, isPlaying, currentTime } = currentTrackStore;
    audioRef.current.src = currentTrack.url;
    if (isPlaying) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [
    currentTrackStore.currentTrack,
    currentTrackStore.isPlaying,
    currentTrackStore.currentTime,
  ]);
  const { currentTrack, isPlaying } = currentTrackStore;
  return (
    <div className="fixed w-full bottom-0 bg-gray-100 shadow-xl rounded-xl py-4 items-center border z-30 md:justify-between md:px-5 lg:flex lg:py-2 xl:w-10/12 xl:mx-auto xl:left-0 xl:right-0 xl:bottom-5">
      {message && (
        <div className="absolute text-center -top-14 border border-orange-400 w-1/3 py-2 rounded-lg mx-auto left-0 right-0 bg-gray-100">
          {message}
        </div>
      )}
      <div className="flex justify-center lg:mr-5">
        <button onClick={() => handlePrev()}>
          <img src={Prev} alt="" className="w-6 lg:w-5" />
        </button>
        <button onClick={togglePlayPause} className="mx-5">
          {isPlaying ? (
            <img src={Pause} alt="" className="w-8 lg:w-6" />
          ) : (
            <img src={Play} className="w-8 lg:w-6" />
          )}
        </button>
        <button onClick={() => handleNext()}>
          <img src={Next} alt="" className="w-6 lg:w-5" />
        </button>
      </div>
      <div className="flex mt-5 justify-center lg:mt-0">
        <img
          className="w-20 h-20 object-cover rounded-2xl mr-5 lg:w-14 lg:h-14"
          src={currentTrack.img}
          alt=""
        />
        <div>
          <h2 className="text-xl truncate w-full block xl:text-base">
            {currentTrack.title}
          </h2>
          <div className="mr-2 font-normal text-xl text-gray-500 xl:text-sm">
            <Link
              className="mr-2"
              to={`/author/${currentTrack.authorId}`}
              onClick={(e) => e.stopPropagation()}
            >
              {currentTrack.authorNickname}
            </Link>
            {currentTrack.coautors &&
              currentTrack.coautors.map((e, i) => (
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
      <audio
        ref={audioRef}
        onLoadedMetadata={handleDurationChange}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="flex justify-center mx-auto mt-5 text-2xl lg:text-lg lg:mt-0">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          value={currentTime}
          min="0"
          step="0.01"
          max={duration}
          onChange={handleCurrentTime}
          className="mx-5 w-40 bg-black md:w-1/2 xl:w-96"
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex mt-5 justify-center w-full md:w-auto lg:mt-0">
        <img
          src={Volume}
          alt=""
          onClick={() => {
            setModalVolume(!modalVolume);
          }}
          className="cursor-pointer mr-1 w-8 md:w-12 lg:w-8  xl:w-6"
        />
        {modalVolume && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            ref={volumeRef}
            onChange={handleVolumeChange}
            className="-top-10 w-20 md:w-40 lg:w-20"
          />
        )}
        <div onClick={handleRepeat} className="cursor-pointer ml-5">
          {currentTrackStore.repeat ? (
            <img src={Repeat_a} alt="" className="w-8 md:w-12 lg:w-8 xl:w-6" />
          ) : (
            <img src={Repeat_d} alt="" className="w-8 md:w-12 lg:w-8 xl:w-6" />
          )}
        </div>
      </div>
    </div>
  );
});

export default Player;
