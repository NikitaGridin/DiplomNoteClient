import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Track from "../components/Track";
import userStore from "../store/userStore";

const PlaylistPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = React.useState();
  const getPlaylist = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}playlist/one/${id}`
      );
      setAlbum(data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  React.useEffect(() => {
    getPlaylist();
  }, []);
  const deleteTrack = (id) => {
    const newTracks = elements.filter(() => track.id !== id);
    setElements(newTracks);
  };
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      {album && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4 mb-10">
          <img
            className="rounded-lg w-full h-64 object-cover"
            src={import.meta.env.VITE_IMG_URL + album.img}
            alt=""
          />
          <div>
            <h1 className="text-2xl font-semibold mb-4">{album.title}</h1>
            <Link
              className="text-дп font-mormal block mb-2"
              to={`/author/${album.User.id}`}
            >
              Создатель: {album.User.nickname}
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 mb-14 lg:grid-cols-2 xl:grid-cols-3">
        {album &&
          album.Tracks.map((track, i) => {
            return (
              <Track
                key={i}
                num={i + 1}
                track={track}
                addedTracks={userStore.tracksData}
                trackId={track.id}
                url={import.meta.env.VITE_AUDIO_URL + track.audio}
                img={import.meta.env.VITE_IMG_URL + track.Album.img}
                title={track.title}
                authorId={album.User.id}
                authorNickname={album.User.nickname}
                coautors={track.CoauthorAlias}
                delOn={deleteTrack}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PlaylistPage;
