import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import axios from "axios";
import ChangeGenre from "./ChangeGenre";

const Genre = observer(({ genre, deleteGenreD }) => {
  const [modal, setModal] = React.useState(false);

  const deleteGenre = async (e) => {
    e.preventDefault();
    if (window.confirm("Вы уверены что хотите удалить жанр?")) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}genre/delete/${genre.id}`
        );
        deleteGenreD(genre.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeGenre = async (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  return (
    <div
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer relative`}
    >
      {modal && (
        <ChangeGenre setModal={setModal} genre={genre} url={"genre/update"} />
      )}
      <Link to={`/genre/${genre.id}`}>
        <img
          className="rounded-lg w-full h-60 object-cover"
          src={import.meta.env.VITE_IMG_URL + genre.img}
          alt=""
        />
        <div className="m-3">
          <div className="font-bold text-xl mb-2">{genre.title}</div>
          <div className="text-[14px] font-light mb-2">
            Прослушиваний: {Math.floor(genre.avg_plays)}
          </div>
        </div>
        {userStore.userData.role === "admin" && (
          <div className="absolute bottom-2 right-2">
            <button
              className="rounded-xl text-white font-bold bg-blue-600 px-3 text-lg py-1 mr-2"
              onClick={(e) => changeGenre(e)}
            >
              ...
            </button>
            <button
              className="rounded-xl text-white font-bold bg-red-600 px-3 text-lg py-1"
              onClick={(e) => deleteGenre(e)}
            >
              ×
            </button>
          </div>
        )}
      </Link>
    </div>
  );
});

export default Genre;
