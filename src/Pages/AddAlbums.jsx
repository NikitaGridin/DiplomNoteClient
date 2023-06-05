import React from "react";
import { allGenresReq } from "../fetch/get";
import userStore from "../store/userStore";
import axios from "axios";
import Message from "../Components/Message";

const AddAlbums = () => {
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();
  const [albumName, setAlbumName] = React.useState("");
  const [allGenres, setAllGenres] = React.useState([]);
  const [allFriends, setAllFriends] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  const [type, setType] = React.useState();
  const [albumImage, setAlbumImage] = React.useState(null);
  const [tracks, setTracks] = React.useState([]);
  React.useEffect(() => {
    if (message) {
      setMessage(message);
      setTimeout(() => {
        setMessage();
      }, 3000);
    }
  }, [message]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userStore.userData.id);
    formData.append("albumName", albumName);
    formData.append("genre", genre);
    formData.append("type", type);
    formData.append("img", albumImage);

    tracks.forEach((track, index) => {
      formData.append(`trackName${index}`, track.name);
      formData.append(`audio`, track.audio);
      formData.append(
        `trackCollaborators${index}`,
        track.collaborators.join(",")
      );
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}album/add`,
        formData
      );
      setMessage("Альбом успешно добавлен");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessageType("false");
      setMessage(
        error?.response?.data || "Сервер не отвечает, попробуйте позже"
      );
    }
  };

  const types = [
    { name: "Альбом", id: 1 },
    { name: "Сингл", id: 2 },
    { name: "Ep", id: 3 },
  ];
  const handleAddTrack = () => {
    setTracks([...tracks, { name: "", collaborators: [], audio: null }]);
  };
  const handleTrackNameChange = (index, e) => {
    const newTracks = [...tracks];
    newTracks[index].name = e.target.value;
    setTracks(newTracks);
  };

  const handleAudioChange = (index, e) => {
    const newTracks = [...tracks];
    newTracks[index].audio = e.target.files[0];
    setTracks(newTracks);
  };
  const handleSelectCollaborator = (index, collaboratorId) => {
    const newTracks = [...tracks];
    if (!newTracks[index].collaborators.includes(collaboratorId)) {
      newTracks[index].collaborators.push(collaboratorId);
    }
    setTracks(newTracks);
  };

  const handleDeselectCollaborator = (index, collaboratorId) => {
    const newTracks = [...tracks];
    newTracks[index].collaborators = newTracks[index].collaborators.filter(
      (id) => id !== collaboratorId
    );
    setTracks(newTracks);
  };
  const handleRemoveTrack = (index) => {
    const newTracks = [...tracks];
    newTracks.splice(index, 1);
    setTracks(newTracks);
  };
  const getAllGenres = async () => {
    allGenresReq(`genre/all/all`, setAllGenres);
  };
  const getAllFriends = async () => {
    allGenresReq(
      `connections/allFriends/${userStore.userData.id}`,
      setAllFriends
    );
  };
  React.useEffect(() => {
    getAllGenres();
    getAllFriends();
  }, []);
  return (
    <div className="w-9/12 mx-auto">
      {message && (
        <Message
          bg={messageType === "success" ? "bg-green-500" : "bg-red-500"}
          text={message}
        />
      )}
      <form
        action=""
        className="grid grid-cols-1 w-1/2 border p-4 rounded-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-8 text-2xl font-medium">
          Добавление альбома
        </h1>
        <h2>Введите название</h2>
        <input
          type="text"
          placeholder="Название альбома"
          onChange={(e) => setAlbumName(e.target.value)}
          className="border-b-2 mb-6"
        />
        <h2>Тип альбома</h2>
        <select
          defaultValue="0"
          onChange={(e) => setType(e.target.value)}
          className="mb-8"
        >
          <option value="0" disabled>
            Выберите тип
          </option>
          {types.map((e, i) => (
            <option key={i} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <h2>Выберите жанры</h2>
        <div className="flex mb-8">
          {allGenres.length > 0 &&
            allGenres.map((e, i) => (
              <div
                key={i}
                onClick={() => {
                  if (genre.includes(e.id)) {
                    setGenre(genre.filter((genreId) => genreId !== e.id));
                  } else {
                    setGenre([...genre, e.id]);
                  }
                }}
                className={`rounded-lg py-2 px-4 border cursor-pointer flex items-center mr-2 ${
                  genre.includes(e.id) ? "bg-blue-600 text-white" : ""
                }`}
              >
                {e.title}
              </div>
            ))}
        </div>
        <h2>Обложка альбома</h2>
        <input
          type="file"
          className="mb-6"
          name="img"
          accept="image/*"
          onChange={(e) => setAlbumImage(e.target.files[0])}
        />
        {tracks.length > 0 && (
          <div>
            <h1 className="text-xl font-medium">Треки</h1>
            {tracks.map((track, index) => (
              <div key={index} className="mb-4 border p-6">
                <label htmlFor={`track-name-${index}`} className="block mb-2">
                  Название трека
                </label>
                <input
                  type="text"
                  id={`track-name-${index}`}
                  value={track.name}
                  onChange={(e) => handleTrackNameChange(index, e)}
                  className="w-full bg-gray-100 border border-gray-400 p-2 rounded-lg mb-5"
                />
                <h2>Соавторы</h2>
                <div className="flex">
                  {allFriends.length > 0 &&
                    allFriends.map((e, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          if (track.collaborators.includes(e.id)) {
                            handleDeselectCollaborator(index, e.id);
                          } else {
                            handleSelectCollaborator(index, e.id);
                          }
                        }}
                        className={`rounded-lg border mr-2 cursor-pointer flex items-center px-2 py-2 ${
                          track.collaborators.includes(e.id)
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                      >
                        <img
                          src={import.meta.env.VITE_IMG_URL + e.img}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        {e.nickname}
                      </div>
                    ))}
                </div>
                <label htmlFor={`audio-${index}`} className="block mt-4 mb-2">
                  Аудиофайл
                </label>
                <input
                  type="file"
                  id={`audio-${index}`}
                  accept="audio/*"
                  onChange={(e) => handleAudioChange(index, e)}
                  className="mb-5"
                  name="audio"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTrack(index)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Удалить трек
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddTrack}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Добавить трек
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Добавить альбом
        </button>
      </form>
    </div>
  );
};

export default AddAlbums;
