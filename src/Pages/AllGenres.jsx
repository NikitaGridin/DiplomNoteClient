import React from "react";
import Genres from "../Components/Genres";

const AllGenres = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <Genres url={"genre/all"} title={"Все жанры"} />
    </div>
  );
};

export default AllGenres;
