import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Author = observer(({ author }) => {
  return (
    <Link
      to={`/author/${author.id}`}
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}
    >
      <img
        className="rounded-lg w-full h-80 object-cover"
        src={import.meta.env.VITE_IMG_URL + author.img}
        alt=""
      />
      <div className="m-3">
        <div className="text-xl font-semibold mb-2">{author.nickname}</div>
        <div className="text-[14px] font-light mb-2">
          {author.popular_genre}
        </div>
        <div className="text-[14px] font-light mb-2">
          Слушателей в месяц: {Math.floor(author.avg_plays)}
        </div>
      </div>
    </Link>
  );
});

export default Author;
