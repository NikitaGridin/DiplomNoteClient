import React from "react";
import { observer } from "mobx-react-lite";
import Genre from "./Genre";
import { getElements } from "../fetch/get";
import BtnView from "./BtnView";

const PopularTrack = observer(({ url, title }) => {
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
      <div className="grid grid-cols-4 gap-10 mb-14">
        {elements.map((genre, i) => {
          return <Genre key={i} genre={genre} />;
        })}
      </div>
      <div className="text-center">
        {error && <div className="text-center">{error}</div>}
        {!error && <BtnView handleChangePart={handleChangePart} />}
      </div>
    </div>
  );
});

export default PopularTrack;
