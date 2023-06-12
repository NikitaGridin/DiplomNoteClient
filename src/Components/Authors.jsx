import React from "react";
import { observer } from "mobx-react-lite";
import Author from "./Author";
import { getElements } from "../fetch/get";
import BtnView from "./BtnView";

const PopularAlbuns = observer(({ url, title }) => {
  const [elements, setElements] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [error, setError] = React.useState();

  const handleChangePart = async () => {
    getElements(
      `${url}/${currentPart}`,
      setElements,
      setCurrentPart,
      currentPart,
      setError
    );
  };

  React.useEffect(() => {
    handleChangePart();
  }, []);

  return (
    <div className="mb-[120px]">
      <h1 className="font-bold text-2xl mb-7">{title}</h1>
      <div className="grid grid-cols-1 gap-10 mb-14 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {elements.map((author, i) => (
          <Author key={i} author={author} />
        ))}
      </div>
      {error && <div className="text-center">{error}</div>}
      {!error && <BtnView handleChangePart={handleChangePart} />}
    </div>
  );
});

export default PopularAlbuns;
