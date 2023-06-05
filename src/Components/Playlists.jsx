import React from "react";
import { observer } from "mobx-react-lite";
import BtnView from "./BtnView";
import { getElements } from "../fetch/get";
import Playlist from "./Playlist";
import AddPlaylist from "../Components/AddPlaylist";

const Playlists = observer(({ url, userId, title }) => {
  const [elements, setElements] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [error, setError] = React.useState();
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    handleChangePart();
  }, []);

  const handleChangePart = async () => {
    if (userId)
      getElements(
        `${url}/${currentPart}/${userId}`,
        setElements,
        setCurrentPart,
        currentPart,
        setError
      );
    else
      getElements(
        `${url}/${currentPart}`,
        setElements,
        setCurrentPart,
        currentPart,
        setError
      );
  };
  const deletePlaylist = (id) => {
    const newPlaylists = elements.filter((playlist) => playlist.id !== id);
    setElements(newPlaylists);
  };
  return (
    <div className="mb-[120px]">
      {modal && (
        <AddPlaylist
          setModal={setModal}
          elements={elements}
          setElements={setElements}
        />
      )}
      {userId && (
        <button
          className="bg-blue-500 px-6 py-2 text-white rounded-lg mb-2"
          onClick={() => setModal(!modal)}
        >
          Создать плейлист
        </button>
      )}
      <h1 className="font-bold text-2xl mb-7">{title}</h1>
      <div className="grid grid-cols-4 gap-10 mb-14">
        {elements.map((playlist, i) => (
          <Playlist
            playlist={playlist}
            key={i}
            deletePlaylist={deletePlaylist}
          />
        ))}
      </div>
      {error && <div className="text-center">{error}</div>}
      {!error && <BtnView handleChangePart={handleChangePart} />}{" "}
    </div>
  );
});

export default Playlists;
