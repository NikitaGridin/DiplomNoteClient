import React from "react";
import Genres from "../Components/Genres";

const AllGenres = () => {
  return (
    <div className="w-9/12 mx-auto">
      <Genres url={"genre/all"} title={"Все жанры"} />
    </div>
  );
};

export default AllGenres;
