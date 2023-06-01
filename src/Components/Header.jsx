import React from "react";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import Logo from "../assets/logo.svg";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [activeLink, setActiveLink] = React.useState();
  const location = useLocation();

  const style = {
    header:
      "flex w-9/12 mx-auto mt-12 items-end text-xs font-medium justify-between mb-[120px]",
  };

  const links = [
    { link: "/", name: "Главная" },
    { link: "/search", name: "Поиск" },
    { link: "/allPlaylists", name: "Плейлисты" },
    { link: "/libray", name: "Моя коллекция" },
    { link: "/profile", name: "Профиль" },
    { link: "/allAlbums", name: "Альбомы" },
    { link: "/allGenres", name: "Жанры" },
    { link: "/allTracks", name: "Треки" },
    { link: `/author` },
    { link: "/login", name: "Войти" },
  ];

  React.useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [location]);

  return (
    <div className={style.header}>
      <div>
        <Link to="/" className="mr-5 flex items-end">
          <img src={Logo} alt="logo" className="mr-2" />
          <span className="font-bold text-3xl">НОТА!</span>
        </Link>
      </div>
      <div className="flex items-end">
        {links.map((e, i) => {
          if (userStore.isAuth && e.link === "/libray")
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-medium text-xs mr-7 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
              >
                {e.name}
              </Link>
            );
          if (userStore.isAuth && e.link === "/profile")
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-medium text-xs mr-7 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
              >
                {e.name}
              </Link>
            );
          if (!userStore.isAuth && e.link === "/login")
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-medium text-xs mr-7 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
              >
                {e.name}
              </Link>
            );
          if (userStore.isAuth && e.link === "/author")
            return (
              <Link
                to={e.link + `/${userStore.userData.id}`}
                key={i}
                className={`font-medium text-xs mr-7 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
              >
                <img
                  className="w-12 rounded-full"
                  src={import.meta.env.VITE_IMG_URL + userStore.userData.img}
                />
              </Link>
            );
          if (
            e.link !== "/profile" &&
            e.link !== "/author" &&
            e.link !== "/login" &&
            e.link !== "/libray"
          )
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-medium text-xs mr-7 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
              >
                {e.name}
              </Link>
            );
        })}
      </div>
    </div>
  );
}

export default Navbar;
