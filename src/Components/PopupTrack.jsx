import axios from "axios";
import React, { useRef, useEffect } from "react";
import userStore from "../store/userStore";

const PopupTrack = ({ onClose, trackId, playlistId }) => {
  const popupRef = useRef(null);
  const [modal, setModal] = React.useState(false);
  const [a, setA] = React.useState(false);
  const [playlist, setPlaylist] = React.useState();
  const [highlightedPlaylists, setHighlightedPlaylists] = React.useState([]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allPlaylists = async (e) => {
    setModal(!modal);
    try {
      const { data } = await axios.get(
        ` ${import.meta.env.VITE_BACKEND_URL}playlist/playlistForAuthor/${
          userStore.userData.id
        }`
      );
      const filteredData = data.map((playlist) => {
        if (playlist.Tracks && playlist.Tracks.length > 0) {
          const highlighted = playlist.Tracks.some(
            (track) => track.id === trackId
          );
          return { ...playlist, highlighted };
        }
        return playlist;
      });
      setPlaylist(filteredData);
      setHighlightedPlaylists(filteredData.map((p) => p.highlighted));
    } catch (error) {
      console.log(error);
    }
  };

  const addToPlaylist = async (e, playlist, index) => {
    e.stopPropagation();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}playlist/trackInPlaylist`,
        { trackId, playlistId: playlist.id }
      );
      const newHighlightedPlaylists = [...highlightedPlaylists];
      newHighlightedPlaylists[index] = !data.message;
      setHighlightedPlaylists(newHighlightedPlaylists);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={popupRef}
      className="absolute top-0 right-0 bg-white p-4 shadow-xl rounded-lg text-center border z-50"
    >
      {modal &&
        playlist &&
        playlist.map((playlist, i) => {
          const isHighlighted = highlightedPlaylists[i];
          return (
            <div
              key={i}
              onClick={(e) => addToPlaylist(e, playlist, i)}
              className={`rounded-lg flex justify-center py-5 xl:py-2 ${
                isHighlighted ? "bg-green-500 text-white" : "border text-black"
              }`}
            >
              {!isHighlighted && <div className="mr-2">+</div>}
              {isHighlighted && <div className="mr-2">✓</div>}
              {playlist.title}
            </div>
          );
        })}
      <p onClick={() => allPlaylists()}>Добавить в плейлист</p>
    </div>
  );
};

export default PopupTrack;
