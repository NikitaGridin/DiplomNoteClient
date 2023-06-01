import React from "react";
import Albums from "../Components/Albums";

const AllAlbums = () => {
  return (
    <div className="w-9/12 mx-auto">
      <Albums
        url={"album/all"}
        del={false}
        author={false}
        title={"Все альбомы"}
      />
    </div>
  );
};

export default AllAlbums;
