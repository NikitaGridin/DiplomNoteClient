import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 w-9/12 mx-auto rounded-lg text-sm py-8 px-8 mt-40">
      <div className="flex items-center space-x-8 mb-5">
        <a href="/about" className="text-xl font-semibold">
          О нас
        </a>
        <a href="/rules" className="text-xl font-semibold">
          Правила публикации
        </a>
        <a href="/publish" className="text-xl font-semibold">
          Исполнителям
        </a>
        <a href="/help" className="text-xl font-semibold">
          Справка
        </a>
      </div>
      <div className="text-sm font-light mb-5">
        Сервис Яндекс Музыка может содержать информацию, не предназначенную для
        несовершеннолетних
      </div>
      <div className="font-light">© 2023 ООО НОТА». Проект компании НОТА.</div>
    </footer>
  );
};

export default Footer;
