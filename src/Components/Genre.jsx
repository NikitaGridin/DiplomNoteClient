import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Genre = observer(({ genre }) => {
  return (
    <Link
      to={"genre"}
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}
    >
      <img
        className="rounded-lg w-full h-60 object-cover"
        src={import.meta.env.VITE_IMG_URL + genre.img}
        alt=""
      />
      <div className="m-3">
        <div className="font-bold text-sm mb-2">{genre.title}</div>
        <div className="text-[10px] font-light mb-2">
          {genre.auditions} прослушиваний
        </div>
      </div>
    </Link>
  );
});

export default Genre;
