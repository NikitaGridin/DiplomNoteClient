import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import currentTrackStore from "../store/currentTrackStore";

const Footer = () => {
  return (
    <footer
      className={`bg-gray-200 w-11/12 mx-auto rounded-lg text-sm py-4 px-4 mt-40 xl:w-10/12 ${
        currentTrackStore.isPlaying ? "mb-72 lg:mb-32" : ""
      }`}
    >
      <Link to="/" className="mr-5 flex items-end">
        <img src={Logo} alt="logo" className="mr-2" />
        <span className="font-bold text-3xl">НОТА!</span>
      </Link>
      <div className="mb-5 xl:flex mt-6">
        <a
          href="/about"
          className="text-3xl font-semibold block mb-4 xl:mr-5 truncate md:text-xl"
        >
          О нас
        </a>
        <a
          href="/rules"
          className="text-3xl font-semibold block mb-4 xl:mr-5 truncate md:text-xl"
        >
          Правила публикации
        </a>
        <a
          href="/publish"
          className="text-3xl font-semibold block mb-4 xl:mr-5 truncate md:text-xl"
        >
          Исполнителям
        </a>
        <a
          href="/help"
          className="text-3xl font-semibold block mb-4 xl:mr-5 truncate md:text-xl"
        >
          Справка
        </a>
      </div>
      <div className="text-xl font-light mb-5 truncate md:text-lg">
        Сервис НОТА может содержать информацию, не предназначенную для
        несовершеннолетних
      </div>
      <div className="font-light text-xl md:text-lg">
        © 2023 ООО НОТА». Проект компании НОТА.
      </div>
    </footer>
  );
};

export default Footer;
