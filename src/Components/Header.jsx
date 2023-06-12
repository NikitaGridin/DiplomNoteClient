import React from "react";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import Logo from "../assets/logo.svg";
import oBurger from "../assets/o_burger.svg";
import cBurger from "../assets/c_burger.svg";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [activeLink, setActiveLink] = React.useState();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const style = {
    header:
      "flex w-11/12 mx-auto mt-10 items-end text-sm font-normal justify-between mb-[120px] xl:w-10/12",
  };

  const handleMenu = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const links = [
    { link: "/", name: "Главная" },
    { link: "/search", name: "Поиск" },
    { link: "/libray", name: "Моя коллекция" },
    { link: "/allAlbums", name: "Альбомы" },
    { link: "/allAuthors", name: "Исполнители" },
    { link: "/allPlaylists", name: "Плейлисты" },
    { link: "/allGenres", name: "Жанры" },
    { link: "/admin", name: "Админ панель" },
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
      <div
        className={`fixed top-0 left-0 w-full h-screen text-3xl z-10 bg-gray-100 py-10 px-5 overflow-scroll lg:relative lg:h-auto lg:flex lg:text-sm lg:p-0 lg:w-auto lg:items-center lg:bg-white xl:overflow-auto ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {isMenuOpen && (
          <div
            className="flex flex-col justify-center z-50 absolute right-5 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            {" "}
            <img src={cBurger} alt="" />
          </div>
        )}
        {links.map((e, i) => {
          if (userStore.isAuth && e.link === "/libray")
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-normal block mb-8 lg:mb-0 md:mr-4 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
                onClick={() => handleMenu()}
              >
                {e.name}
              </Link>
            );
          if (!userStore.isAuth && e.link === "/login")
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-normal  block mb-8 lg:mb-0 md:mr-4 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
                onClick={() => handleMenu()}
              >
                {e.name}
              </Link>
            );
          if (userStore.userData.role === "admin" && e.link === "/admin")
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-normal  block mb-8 lg:mb-0 md:mr-4 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
                onClick={() => handleMenu()}
              >
                {e.name}
              </Link>
            );
          if (userStore.isAuth && e.link === "/author")
            return (
              <Link
                to={e.link + `/${userStore.userData.id}`}
                key={i}
                className={`font-normal block mb-8 lg:mb-0 md:mr-4 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
                onClick={() => handleMenu()}
              >
                <img
                  className="w-32 rounded-full h-32 object-cover lg:w-12 lg:h-12"
                  src={import.meta.env.VITE_IMG_URL + userStore.userData.img}
                />
              </Link>
            );
          if (
            e.link !== "/author" &&
            e.link !== "/login" &&
            e.link !== "/admin" &&
            e.link !== "/libray"
          )
            return (
              <Link
                to={e.link}
                key={i}
                className={`font-normal  block mb-8 lg:mb-0 md:mr-4 ${
                  activeLink === e.link ? "text-orange-400" : ""
                }`}
                onClick={() => handleMenu()}
              >
                {e.name}
              </Link>
            );
        })}
      </div>
      {!isMenuOpen && (
        <div
          className="flex flex-col justify-center z-50 lg:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <img src={oBurger} alt="" />
        </div>
      )}
    </div>
  );
}

export default Navbar;
