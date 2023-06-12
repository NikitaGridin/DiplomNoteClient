import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Tracks from "../Components/Tracks";
import Albums from "../Components/Albums";
import Authors from "../Components/Authors";

const GenrePage = () => {
  const { id } = useParams();
  const [genre, setGenre] = React.useState();

  const getGenre = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}genre/one/${id}`
      );
      setGenre(data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  React.useEffect(() => {
    getGenre();
  }, []);
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      {genre && (
        <div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4 mb-10">
            <img
              className="rounded-lg w-full h-64 object-cover"
              src={import.meta.env.VITE_IMG_URL + genre.img}
              alt=""
            />
            <div>
              <h1 className="text-5xl font-semibold mb-4">{genre.title}</h1>
              <h1 className="font-light">
                Прослушиваний в месяц: {Math.floor(genre.avg_plays)}
              </h1>
            </div>
          </div>
          <Tracks
            url={"track/tracksForGenre"}
            userId={null}
            genreId={id}
            title={"Популярные треки"}
            hidden={false}
          />
          <Albums
            url={"album/albumsForGenre"}
            author={false}
            genreId={id}
            title={"Популярные альбомы"}
            hidden={false}
          />
          <Authors
            url={"authors/authorForGenre"}
            title={"Популярные исполнители"}
          />
        </div>
      )}
    </div>
  );
};

export default GenrePage;
