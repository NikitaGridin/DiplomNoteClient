import React from "react";

const RulesPage = () => {
  return (
    <div className="w-9/12 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Правила публикации музыки</h1>
      <div className="grid grid-cols-1 gap-16 mt-10">
        <div className="">
          <h1 className="text-xl leading-6 font-medium text-gray-900">
            1. Качество записи
          </h1>
          <div className="mt-2 text-base text-gray-500">
            Музыка должна быть записана в хорошем качестве, чтобы звучание было
            чистым и приятным для слуха. Мы не принимаем плохо записанные треки,
            с шумами и помехами.
          </div>
        </div>
        <div className="">
          <h1 className="text-xl leading-6 font-medium text-gray-900">
            2. Авторские права
          </h1>
          <div className="mt-2 text-base text-gray-500">
            При публикации музыки необходимо убедиться, что вы имеете право на
            её распространение и использование. Мы не принимаем треки, на
            которые есть претензии со стороны правообладателей.
          </div>
        </div>
        <div className="">
          <h1 className="text-xl leading-6 font-medium text-gray-900">
            3. Содержание текста
          </h1>
          <div className="mt-2 text-base text-gray-500">
            Мы не принимаем музыку с , призывами к насилию или распространению
            ненависти. Тексты песен должны соответствовать нормам морали и
            этики.
          </div>
        </div>
        <div className="">
          <h1 className="text-xl leading-6 font-medium text-gray-900">
            4. Продолжительность трека
          </h1>
          <div className="mt-2 text-base text-gray-500">
            Мы не принимаем музыку, длительность которой превышает 10 минут.
            Длинные композиции могут вызвать неудобство для пользователей,
            которые хотят прослушать музыку в режиме онлайн.
          </div>
        </div>
        <div className="">
          <h1 className="text-xl leading-6 font-medium text-gray-900">
            5. Причины отклонения публикации
          </h1>
          <div className="mt-2 text-base text-gray-500">
            Администратор может отклонить публикацию музыки по следующим
            причинам: несоответствие правилам публикации, нарушение авторских
            прав, низкое качество записи, содержание ненормативной лексики или
            призывов к насилию, длинная продолжительность трека.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
