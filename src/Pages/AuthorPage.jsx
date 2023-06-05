import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Albums from "../Components/Albums";
import Tracks from "../Components/Tracks";
import { useNavigate } from "react-router-dom";

import { logoutReq } from "../fetch/post";

import userStore from "../store/userStore";
import { observer } from "mobx-react-lite";

const AuthorPage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = React.useState();
  const [view, setView] = React.useState("tracks");
  const [subscribe, setSubscribe] = React.useState();

  const logout = async () => {
    try {
      await logoutReq();
      localStorage.removeItem("token");
      userStore.logout();
      navigate("/", { replace: true });
    } catch (error) {
      alert(error?.response?.data);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}user/one/${id}`
      );
      setUser(data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const checkSubscribe = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}connections/checkSubscribe/${
          userStore.userData.id
        }/${id}`
      );
      setSubscribe(data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const changeSubscribe = async (status) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}connections/changeSubscribe`,
        {
          id: id,
          userId: userStore.userData.id,
          status: status,
        }
      );
      checkSubscribe();
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  React.useEffect(() => {
    getUser();
    if (userStore.userData.id) {
      checkSubscribe();
    }
  }, [id, userStore.userData.id]);
  return (
    <div className="w-9/12 mx-auto">
      {user && (
        <>
          <div className="grid grid-cols-4 mb-10">
            <img
              src={import.meta.env.VITE_IMG_URL + user.img}
              alt=""
              className="w-64 h-64 object-cover rounded-full"
            />
            <div>
              <div className="mb-4">Исполнитель</div>
              <div className="font-bold text-4xl mb-4">{user.nickname}</div>
              <div className="mb-2">{user.subscribes} подписчиков</div>
              <div>Ежемесячных слушаталей: {Math.floor(user.avg_plays)}</div>
              {userStore.userData.id == id && (
                <div className="flex mt-10">
                  <Link
                    to={"/addAlbum"}
                    className="cursor-pointer border py-2 px-4 rounded-lg mr-4"
                  >
                    Добавить альбом
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="bg-red-500 text-white px-4 rounded-lg"
                  >
                    Выйти
                  </button>
                </div>
              )}
              {userStore.userData.id != id && (
                <div className="flex mt-10">
                  <button
                    className="cursor-pointer border py-2 px-4 rounded-lg mr-4"
                    onClick={() =>
                      changeSubscribe(
                        subscribe === "Подписаться" ||
                          subscribe === "На вас подписан"
                          ? "add"
                          : "delete"
                      )
                    }
                  >
                    {subscribe}
                  </button>
                </div>
              )}
            </div>
          </div>
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
            {userStore.userData.id == id && (
              <button
                onClick={() => setView("waitAccept")}
                className={`${
                  view === "waitAccept" ? "border-b-4 border-[#1986EC]" : ""
                }`}
              >
                Заявки на соавторство
              </button>
            )}
          </div>

          {view === "tracks" && (
            <Tracks
              url={"track/tracksForAuthor"}
              del={false}
              userId={id}
              title={"Треки исполнителя"}
            />
          )}
          {view === "albums" && (
            <Albums
              url={"album/albumsForAuthor"}
              del={false}
              author={false}
              title={"Все альбомы исполнителя"}
              hidden={false}
              userId={id}
            />
          )}
          {view === "waitAccept" && userStore.userData.id == id && (
            <Tracks
              url={"author/waitAccept"}
              userId={userStore.userData.id}
              title={"Заявки на соавторство"}
              hidden={false}
              wait={true}
            />
          )}
        </>
      )}
    </div>
  );
});

export default AuthorPage;
