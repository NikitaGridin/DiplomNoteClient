import React from "react";
import Tracks from "../Components/Tracks";

const AllTracks = () => {
  return (
    <div className="w-9/12 mx-auto">
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
