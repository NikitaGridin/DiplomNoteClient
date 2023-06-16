import React from "react";
import axios from "axios";
import Message from "./Message";

const ChangeAlbum = ({ setModal, album }) => {
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();
  const [title, setTitle] = React.useState(album.title);
  const [img, setImg] = React.useState(null);

  React.useEffect(() => {
    if (message) {
      setMessage(message);
      setTimeout(() => {
        setMessage();
      }, 2000);
    }
  }, [message]);

  const editAlbum = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (img) {
        formData.append("img", img);
      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}album/update/${album.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      album.title = data.title;
      if (data.img) {
        album.img = data.img;
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
        onSubmit={(e) => editAlbum(e)}
      >
        <h2 className="text-2xl font-bold mb-4">Редактировать альбом</h2>
        <label className="font-medium" htmlFor="name">
          Название
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

export default ChangeAlbum;
