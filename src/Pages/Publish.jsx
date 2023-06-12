import React from "react";

const Publish = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <div className="">
        <h1 className="text-3xl font-bold mb-4"> Пошаговая инструкция</h1>
        <p className="mt-4 text-2xl text-justify text-gray-500 md:text-xl">
          Следуя этой простой инструкции, вы сможете добавить свой трек на
          сервис Нота и начать продвижение своей музыки.
        </p>

        <div className="mt-20">
          <dl className="grid grid-cols-1 gap-20  md:grid-cols-2">
            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 1: Зарегистрируйтесь
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                Для того чтобы добавить свой трек на Нота, вам необходимо
                зарегистрироваться на нашем сервисе. Вы получите доступ к своей
                учетной записи, где вы сможете создать свой альбом и добавить
                треки.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 2: Подтвердите свой аккаунт
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                После регистрации вы получите письмо с подтверждением.
                Пожалуйста, следуйте инструкциям в письме, чтобы подтвердить
                свой аккаунт на Нота.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 3: Создайте свой альбом
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                После подтверждения своего аккаунта вы сможете создать свой
                альбом на Нота. Заполните все необходимые поля, такие как
                название, жанр, год выпуска и т.д.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 4: Внесите свои треки
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                После создания своего альбома вы сможете добавить свои треки на
                Нота. Заполните информацию о каждом треке, такую как название,
                продолжительность, текст песни и т.д.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 5: Выберите соавторов для каждого трека
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                Если вы работали над треком вместе с другими авторами, вы можете
                добавить их как соавторов для каждого трека. Это поможет вам
                распространить свою музыку и получить больше внимания на Нота.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 6: Выберите обложку для альбома
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                Выберите обложку для своего альбома, которая будет отображаться
                на странице альбома и на страницах треков. Загрузите изображение
                согласно нашим требованиям к размеру и формату.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 7: Отправьте на подтверждение публикации
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                После того, как вы заполнили всю информацию о своем альбоме и
                добавили все треки, отправьте свой альбом на нашу платформу для
                подтверждения публикации. Наш администратор проверит ваш альбом
                на соответствие нашим правилам и качеству.
              </div>
            </div>

            <div>
              <h1 className="text-3xl leading-10 font-semibold text-gray-900 lg:text-xl">
                Шаг 8: Публикация одобрена
              </h1>
              <div className="mt-2 text-2xl text-justify text-gray-500 md:text-lg">
                Когда ваш альбом пройдет проверку нашего администратора и будет
                одобрен для публикации, вы получите уведомление на свой
                электронный адрес. После этого ваш альбом будет доступен на
                нашем сервисе, и вы сможете начать продвижение своей музыки.
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Publish;
