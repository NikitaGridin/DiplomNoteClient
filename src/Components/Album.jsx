import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Album = observer(({ album, deleteAlbum, author }) => {
  return (
    <Link
      to={"*"}
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}
      onClick={() => handleModal()}
    >
      <img
        className="rounded-lg w-full h-80 object-cover"
        src={import.meta.env.VITE_IMG_URL + album.img}
        alt=""
      />
      <div className="m-3">
        <div className="font-bold text-sm mb-2">{album.title}</div>
        <div className="text-sm font-light mb-2">{album.author}</div>
        <div className="text-[10px] font-light mb-2">
          {album.auditions} прослушиваний
        </div>
      </div>
    </Link>
  );
});

export default Album;
