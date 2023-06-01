import React from "react";
import Playlists from "../Components/Playlists";

const AllPlaylists = () => {
  return (
    <div className="w-9/12 mx-auto">
      <Playlists url={"playlist/all"} title={"Все плейлисты"} />
    </div>
  );
};

export default AllPlaylists;
