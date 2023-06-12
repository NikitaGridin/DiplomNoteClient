import React from "react";
import Albums from "../Components/Albums";
import Tracks from "../Components/Tracks";
import Playlists from "../Components/Playlists";
import { observer } from "mobx-react-lite";
import userStore from "../store/userStore";

const Library = observer(() => {
  const [view, setView] = React.useState("tracks");

  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <div className="mb-10">
        <button
          onClick={() => setView("tracks")}
          className={`${
            view === "tracks" ? "border-b-4 border-[#1986EC]" : ""
          } mr-8`}
        >
          Треки
        </button>
        <button
          onClick={() => setView("albums")}
          className={`${
            view === "albums" ? "border-b-4 border-[#1986EC]" : ""
          } mr-8`}
        >
          Альбомы
        </button>
        <button
          onClick={() => setView("playlists")}
          className={`${
            view === "playlists" ? "border-b-4 border-[#1986EC]" : ""
          } mr-8`}
        >
          Плейлисты
        </button>{" "}
        <button
          onClick={() => setView("latest")}
          className={view === "latest" ? "border-b-4 border-[#1986EC]" : ""}
        >
          Прослушивания
        </button>
      </div>

      {view === "tracks" && userStore.userData.id && (
        <Tracks
          url={"libray/allTrack"}
          userId={userStore.userData.id}
          title={"Добавленные треки"}
          hidden={true}
        />
      )}
      {view === "albums" && userStore.userData.id && (
        <Albums
          url={"libray/allAlbum"}
          del={false}
          author={false}
          userId={userStore.userData.id}
          title={"Добавленные альбомы"}
          hidden={true}
        />
      )}
      {view === "playlists" && userStore.userData.id && (
        <Playlists
          title={"Добавленные плейлисты"}
          url={"libray/allPlaylist"}
          userId={userStore.userData.id}
        />
      )}
      {view === "latest" && userStore.userData.id && (
        <Tracks
          url={"track/latest"}
          userId={userStore.userData.id}
          title={"Последние прослушанные треки"}
          hidden={false}
        />
      )}
    </div>
  );
});

export default Library;
