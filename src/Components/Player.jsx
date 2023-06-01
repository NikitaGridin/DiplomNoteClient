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
      console.log(currentTrackStore);
      audioRef.current.play();
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
      console.log(currentTrackStore);
      audioRef.current.play();
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
    <div className="fixed w-1/2 mx-auto left-0 right-0 bottom-5 flex bg-gray-100 shadow-xl rounded-xl py-2 px-7 items-center border">
      <div className="flex mr-10">
        <button onClick={() => handlePrev()}>
          <img src={Prev} alt="" />
        </button>
        <button onClick={togglePlayPause} className="mx-4">
          {isPlaying ? <img src={Pause} alt="" /> : <img src={Play} />}
        </button>
        <button onClick={() => handleNext()}>
          <img src={Next} alt="" />
        </button>
      </div>
      <div className="flex items-center">
        <img
          className="w-10 h-10 object-cover rounded-2xl mr-5"
          src={currentTrack.img}
          alt=""
        />
        <div>
          <h2>{currentTrack.title}</h2>
          <div>
            <span className="mr-2 text-xs font-normal text-gray-500">
              {currentTrack.authorNickname}
            </span>
            {currentTrack.coautors &&
              currentTrack.coautors.map((e, i) => (
                <span
                  key={i}
                  className="mr-2 text-xs font-normal text-gray-500"
                >
                  {e.User.nickname}
                </span>
              ))}
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={handleDurationChange}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="flex items-center mx-auto">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          value={currentTime}
          min="0"
          step="0.01"
          max={duration}
          onChange={handleCurrentTime}
          className="mx-5 w-48 bg-black"
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="mr-14 w-20 flex">
        <img
          src={Volume}
          alt=""
          onClick={() => {
            setModalVolume(!modalVolume);
          }}
          className="cursor-pointer mr-1"
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
            className="-top-10 w-20"
          />
        )}
      </div>

      <div onClick={handleRepeat} className="cursor-pointer">
        {currentTrackStore.repeat ? (
          <img src={Repeat_a} alt="" />
        ) : (
          <img src={Repeat_d} alt="" />
        )}
      </div>
    </div>
  );
});

export default Player;
