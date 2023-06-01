import React from "react";
import { Link } from "react-router-dom";

const Playlist = ({ playlist }) => {
  return (
    <Link
      to={"*"}
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}
    >
      <img
        className="rounded-lg w-full h-80 object-cover"
        src={import.meta.env.VITE_IMG_URL + playlist.img}
        alt=""
      />
      <div className="m-3">
        <div className="font-bold text-sm mb-2">{playlist.title}</div>
        <div className="text-sm font-light mb-2">{playlist.User.nickname}</div>
        <div className="text-[10px] font-light mb-2">
          {playlist.auditions} прослушиваний
        </div>
      </div>
    </Link>
  );
};

export default Playlist;
