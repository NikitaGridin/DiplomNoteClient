import React from "react";
import { observer } from "mobx-react-lite";
import Genre from "./Genre";
import { getElements } from "../fetch/get";
import BtnView from "./BtnView";
import AddGenre from "../Components/AddGenre";
import userStore from "../store/userStore";

const PopularTrack = observer(({ url, title }) => {
  const [elements, setElements] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [error, setError] = React.useState();
  const [modal, setModal] = React.useState(false);

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

  const deleteGenre = (id) => {
    const newGenres = elements.filter((genre) => genre.id !== id);
    setElements(newGenres);
  };
  return (
    <div className="mb-[120px]">
      {modal && (
        <AddGenre
          setModal={setModal}
          elements={elements}
          setElements={setElements}
        />
      )}
      {userStore.userData.role === "admin" && (
        <button
          onClick={() => setModal(!modal)}
          className="bg-blue-500 text-white py-4 px-6 font-semibold rounded-lg mb-5"
        >
          Добавить жанр
        </button>
      )}
      <h1 className="font-bold text-2xl mb-7">{title}</h1>
      <div className="grid grid-cols-1 gap-10 mb-14 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {elements.map((genre, i) => {
          return <Genre key={i} genre={genre} deleteGenreD={deleteGenre} />;
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
