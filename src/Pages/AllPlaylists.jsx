import React from "react";
import Playlists from "../Components/Playlists";

const AllPlaylists = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <Playlists url={"playlist/all"} title={"Все плейлисты"} />
    </div>
  );
};

export default AllPlaylists;
