import React from "react";
import Track from "./Track";
import userStore from "../store/userStore";
import { observer } from "mobx-react-lite";
import BtnView from "./BtnView";
import { getElements } from "../fetch/get";

const Tracks = observer(({ url, userId, title, hidden, wait, genreId }) => {
  const [elements, setElements] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    setElements([]);
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

  const deleteTrack = (id) => {
    const newTracks = elements.filter((track) => track.id !== id);
    setElements(newTracks);
  };
  const hiddenTrack = (id) => {
    const newTracks = elements.filter((track) => track.id !== id);
    setElements(newTracks);
  };
  return (
    <div className="mb-[120px]">
      <h1 className="font-bold text-2xl mb-7">{title}</h1>
      <div className="grid grid-cols-1 gap-4 mb-14 lg:grid-cols-2 xl:grid-cols-3">
        {elements.map((track, i) => {
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
              delOn={deleteTrack}
              hidden={hidden ? hiddenTrack : undefined}
              wait={wait ? hiddenTrack : undefined}
            />
          );
        })}
      </div>
      {error && <div className="text-center">{error}</div>}
      {!error && <BtnView handleChangePart={handleChangePart} />}
    </div>
  );
});

export default Tracks;
