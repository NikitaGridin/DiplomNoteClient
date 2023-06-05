import React from "react";
import Album from "./Album";
import { observer } from "mobx-react-lite";
import BtnView from "./BtnView";
import { getElements } from "../fetch/get";
import userStore from "../store/userStore";

const Albums = observer(({ url, userId, title, hidden, genreId }) => {
  const [elements, setElements] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    handleChangePart();
  }, [userId]);

  const handleChangePart = async () => {
    if (userId) {
      getElements(
        `${url}/${currentPart}/${userId}`,
        setElements,
        setCurrentPart,
        currentPart,
        setError
      );
    } else if (genreId) {
      getElements(
        `${url}/${currentPart}/${genreId}`,
        setElements,
        setCurrentPart,
        currentPart,
        setError
      );
    } else {
      getElements(
        `${url}/${currentPart}`,
        setElements,
        setCurrentPart,
        currentPart,
        setError
      );
    }
  };
  const deleteAlbum = (id) => {
    const newTracks = elements.filter((element) => element.id !== id);
    setElements(newTracks);
  };
  return (
    <div className="mb-[120px]">
      <h1 className="font-bold text-2xl mb-7">{title}</h1>
      <div className="grid grid-cols-4 gap-10 mb-14">
        {elements.map((album, i) => {
          return (
            <Album
              key={i}
              album={album}
              deleteAlbum={deleteAlbum}
              addedAlbums={userStore.albumsData}
              hidden={hidden ? deleteAlbum : undefined}
            />
          );
        })}
      </div>
      {error && <div className="text-center">{error}</div>}
      {!error && <BtnView handleChangePart={handleChangePart} />}
    </div>
  );
});

export default Albums;
