import React from "react";
import Tracks from "../Components/Tracks";

const AllTracks = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <Tracks
        url={"track/all"}
        del={false}
        author={false}
        title={"Все Треки"}
      />
    </div>
  );
};

export default AllTracks;
