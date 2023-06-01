import React from "react";

const NoPages = () => {
  return (
    <div className="flex">
      <div className="m-auto text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="text-2xl font-medium my-10">Страница не найдена</h2>
        <p className="text-lg mb-10">
          К сожалению, запрошенная страница не существует.
        </p>
        <a
          href="/"
          className="bg-gray-900 text-white font-medium py-3 px-6 rounded"
        >
          Перейти на главную
        </a>
      </div>
    </div>
  );
};
export default NoPages;
