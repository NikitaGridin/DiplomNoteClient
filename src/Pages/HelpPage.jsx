import React from "react";

const HelpPage = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <h1 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h1>
      <div className="grid grid-cols-1 gap-16 mt-10">
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как зарегистрироваться на сайте?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы зарегистрироваться на нашем сайте, перейдите на
            страницу регистрации и заполните все необходимые поля. После этого
            вы получите на указанный электронный адрес письмо с подтверждением
            регистрации.
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как авторизоваться на сайте?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы авторизоваться на нашем сайте, введите свой логин и
            пароль в соответствующие поля на странице авторизации. После этого
            вы будете перенаправлены на главную страницу с возможностью
            прослушивать музыку, добавлять её в библиотеку и создавать
            плейлисты.
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как послушать музыку на сайте?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы послушать музыку на нашем сайте, просто выберите
            интересующий вас альбом или исполнителя и нажмите на кнопку
            воспроизведения. Вы также можете добавлять песни в свою библиотеку и
            создавать плейлисты для более удобного прослушивания.
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как добавить музыку в библиотеку?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы добавить музыку в свою библиотеку, прослушайте
            интересующую вас песню или альбом и нажмите на кнопку "Добавить в
            библиотеку". После этого песня или альбом будут доступны в вашей
            библиотеке на странице профиля.
          </div>
        </div>
        <div className="">
          <h1 className="text-xl font-bold mb-4">Как создать плейлист?</h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы создать плейлист, перейдите на страницу своей
            библиотеки и нажмите на кнопку "Создать плейлист". Дайте плейлисту
            имя и добавьте в него песни из своей библиотеки. Вы также можете
            добавлять песни из библиотеки других пользователей, если они
            разрешили доступ к своей музыке.
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как опубликовать альбом?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы опубликовать альбом, перейдите на страницу создания
            альбома и заполнитевсе необходимые поля: название альбома,
            исполнитель, обложка и список песен. После этого нажмите на кнопку
            "Опубликовать", и ваш альбом будет доступен для прослушивания на
            сайте.
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как подписаться на исполнителей?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы подписаться на исполнителя, перейдите на его
            страницу и нажмите на кнопку "Подписаться". После этого вы будете
            получать уведомления о новых песнях и альбомах этого исполнителя.
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
            Как делать совместные публикации?
          </h1>
          <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
            Для того, чтобы сделать совместную публикацию, выберите песню или
            альбом, которую хотите опубликовать, и нажмите на кнопку
            "Поделиться". После этого выберите социальную сеть, на которую вы
            хотите опубликовать запись, и поделитесь ссылкой на песню или
            альбом.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
