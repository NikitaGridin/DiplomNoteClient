import React from "react";
import axios from "axios";
import Message from "./Message";

const ChangeGenre = ({ setModal, genre, url }) => {
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();
  const [title, setTitle] = React.useState(genre.nickname);
  const [email, setEmail] = React.useState(genre.email);
  const [password, setPassword] = React.useState();
  const [img, setImg] = React.useState(null);

  React.useEffect(() => {
    if (message) {
      setMessage(message);
      setTimeout(() => {
        setMessage();
      }, 2000);
    }
  }, [message]);

  const editGenre = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (genre.nickname != title) {
        formData.append("nickname", title);
      }
      if (genre.email != email) {
        formData.append("email", email);
      }
      formData.append("password", password);
      if (img) {
        formData.append("img", img);
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}${url}/${genre.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data.nickname) {
        genre.nickname = data.nickname;
      }
      if (data.img) {
        genre.img = data.img;
      }
      setMessage("Данные изменены!");
      setMessageType("success");
      setTimeout(() => {
        setModal(false);
      }, 2000);
    } catch (error) {
      setMessage(
        error?.response?.data || "Сервер не отвечает, попробуйте позже"
      );
      console.log(error);
      setMessageType("false");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 bg-black/30 w-full h-screen flex justify-center items-center z-40"
      onClick={() => setModal(false)}
    >
      {message && (
        <Message
          bg={messageType === "success" ? "bg-green-500" : "bg-red-500"}
          text={message}
        />
      )}
      <form
        className="flex flex-col space-y-4 bg-white rounded-lg p-10 w-full lg:w-1/2"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => editGenre(e)}
      >
        <h2 className="text-2xl font-bold mb-4">Редактировать данные</h2>
        <label className="font-medium" htmlFor="name">
          Никнейм
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="name"
          name="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="font-medium" htmlFor="name">
          Email
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="name"
          name="name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="font-medium" htmlFor="name">
          Пароль
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="name"
          name="name"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="font-medium" htmlFor="name">
          Обложка
        </label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          id="name"
          name="cover"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default ChangeGenre;
