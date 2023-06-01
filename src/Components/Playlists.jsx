import React from "react";
import { observer } from "mobx-react-lite";
import BtnView from "./BtnView";
import { getElements } from "../fetch/get";
import Playlist from "./Playlist";

const Playlists = observer(({ url, userId, title }) => {
  const [elements, setElements] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [error, setError] = React.useState();

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
  return (
    <div className="mb-[120px]">
      <h1 className="font-bold text-2xl mb-7">{title}</h1>
      <div className="grid grid-cols-4 gap-10 mb-14">
        {elements.map((playlist, i) => (
          <Playlist playlist={playlist} key={i} />
        ))}
      </div>
      {error && <div className="text-center">{error}</div>}
      {!error && <BtnView handleChangePart={handleChangePart} />}{" "}
    </div>
  );
});

export default Playlists;
