import React from "react";
import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";

import Track from "../Components/Track";
import Genre from "../Components/Genre";
import Album from "../Components/Album";
import Playlist from "../Components/Playlist";

import { searchReq } from "../fetch/get";
import { Link } from "react-router-dom";

const Search = observer(() => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [noResults, setNoResults] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let timerId = null;
    if (search) {
      timerId = setTimeout(() => {
        handleSearch(search);
      }, 500);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [search]);

  const handleSearch = async (value) => {
    setLoading(true);
    const data = await searchReq(value);
    setResults({
      albums: data.albums,
      tracks: data.tracks,
      users: data.users,
      playlists: data.playlists,
      genres: data.genres,
    });
    if (!value) {
      setResults([]);
      setNoResults(false);
    }
    if (Object.values(data).every((item) => item.length === 0)) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setNoResults(false);
    setResults([]);
    setSearch("");
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && search.length === 1) {
      setResults([]);
      setNoResults(false);
    }
  };
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <div className="mb-10 md:flex">
        <input
          type="text"
          placeholder="Текст для поиска"
          className="border-black border-b-[1px] w-full pb-2 text-2xl xl:text-lg"
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          onClick={() => handleClear()}
          className="bg-black text-white px-5 py-2 rounded-lg w-full text-2xl md:w-auto md:text-sm"
        >
          Очистить
        </button>
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-screen z-10 flex justify-center bg-white">
            LOADING...
          </div>
        )}
        {noResults && (
          <h1 className="text-center text-2xl font-semibold">
            Ничего не найдено!
          </h1>
        )}
        {results.users && results.users.length > 0 && (
          <div className="mb-28">
            <h1 className="font-bold text-2xl mb-7">Музыканты</h1>
            <div className="grid grid-cols-4 gap-10">
              {results.users.map((user, i) => {
                return (
                  <Link
                    to={`/author/${user.id}`}
                    className="flex items-center"
                    key={i}
                  >
                    <img
                      src={import.meta.env.VITE_IMG_URL + user.img}
                      className="w-20 h-20 object-cover rounded-full mr-5"
                    />
                    {user.nickname}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {results.albums && results.albums.length > 0 && (
          <div className="mb-28">
            <h1 className="font-bold text-2xl mb-7">Альбомы</h1>
            <div className="grid grid-cols-1 gap-10 mb-14 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {results.albums.map((album, i) => (
                <Album key={i} album={album} />
              ))}
            </div>
          </div>
        )}
        {results.playlists && results.playlists.length > 0 && (
          <div className="mb-28">
            <h1 className="font-bold text-2xl mb-7">Плейлисты</h1>
            <div className="grid grid-cols-1 gap-10 mb-14 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {results.playlists.map((playlists, i) => (
                <Playlist key={i} playlist={playlists} />
              ))}
            </div>
          </div>
        )}
        {results.genres && results.genres.length > 0 && (
          <div className="mb-28">
            <h1 className="font-bold text-2xl mb-7">Жанры</h1>
            <div className="grid grid-cols-1 gap-10 mb-14 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {results.genres.map((genre, i) => {
                return <Genre key={i} genre={genre} />;
              })}
            </div>
          </div>
        )}
        {results.tracks && results.tracks.length > 0 && (
          <div className="">
            <h1 className="font-bold text-2xl mb-7">Аудиозаписи</h1>
            <div className="grid grid-cols-1 gap-4 mb-14 lg:grid-cols-2 xl:grid-cols-3">
              {results.tracks.map((track, i) => {
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
                    authorId={track.Album.User.id}
                    authorNickname={track.Album.User.nickname}
                    coautors={track.CoauthorAlias}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Search;
