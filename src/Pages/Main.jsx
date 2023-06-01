import React from "react";
import { observer } from "mobx-react-lite";
import Tracks from "../Components/Tracks";
import Authors from "../Components/Authors";
import Genres from "../Components/Genres";
import Albums from "../Components/Albums";

const Main = observer(() => {
  return (
    <div className="w-9/12 mx-auto">
      <Tracks
        url={"track/mostListenedTracksInCurrentMonth"}
        userId={null}
        title={"Популярные треки"}
        hidden={false}
      />
      <Albums
        url={"album/mostListenedAlbumsInCurrentMonth"}
        author={false}
        title={"Популярные альбомы"}
        hidden={false}
      />
      <Authors
        url={"author/mostListenedAuthorsInCurrentMonth"}
        title={"Популярные исполнители"}
      />
      <Genres
        url={"genre/mostListenedGenresInCurrentMonth"}
        title={"Популярные жанры"}
      />
    </div>
  );
});

export default Main;
