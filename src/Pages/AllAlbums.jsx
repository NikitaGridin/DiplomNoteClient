import React from "react";
import Albums from "../Components/Albums";

const AllAlbums = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
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
