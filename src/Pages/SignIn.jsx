import React from "react";
import { createUser, activateUser } from "../fetch/post";
import { Link, useNavigate } from "react-router-dom";
import Back from "../assets/back.svg";
import Bg_o from "../assets/bg_o.svg";
import Bg_t from "../assets/bg_t.svg";
import Bg_f from "../assets/bg_f.svg";
import Logo from "../assets/logo.svg";
import Message from "../Components/Message";
import userStore from "../store/userStore";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    nickname: "",
    email: "",
    password: "",
    passwordRepeat: "",
    img: null,
  });
  const [submit, setSubmit] = React.useState(false);
  const [activeCode, setActiveCode] = React.useState("");
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();

  React.useEffect(() => {
    if (message) {
      setMessage(message);
      setTimeout(() => {
        setMessage();
      }, 3000);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUser(formData);
      setMessage("На вашу почту отправлен код подтверждения!");
      setMessageType("success");
      setSubmit(true);
    } catch (error) {
      setMessageType("false");
      setMessage(
        error?.response?.data || "Сервер не отвечает, попробуйте позже"
      );
    }
  };

  const handleSubmiActiveCode = async (e) => {
    e.preventDefault();
    try {
      await activateUser(activeCode);
      navigate(`/author/${userStore.userData.id}`, { replace: true });
    } catch (error) {
      setMessageType("false");
      setMessage(
        error?.response?.data || "Сервер не отвечает, попробуйте позже"
      );
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 py-20 h-screen bg-gradient-to-b from-[#22caff] to-[#2229e9]">
      <img src={Bg_o} alt="" className="absolute bottom-0" />
      <img src={Bg_t} alt="" className="absolute top-0" />
      <img src={Bg_f} alt="" className="absolute right-0 bottom-0" />
      {message && (
        <Message
          bg={messageType === "success" ? "bg-green-500" : "bg-red-500"}
          text={message}
        />
      )}
      <form
        action=""
        className="grid grid-cols-1 mx-auto text-center py-4 px-4 bg-white rounded-xl relative lg:w-1/2 lg:px-8 lg:py-8 xl:w-1/4"
      >
        <Link
          to={"/"}
          className="rounded-full shadow-lg py-5 px-6 border absolute -top-8 bg-white lg:top-10 lg:-left-8"
        >
          <img src={Back} alt="" />
        </Link>
        <img src={Logo} alt="" className="mx-auto w-20 mb-7" />
        <h1 className="text-2xl font-semibold mb-11">Добро пожаловать!</h1>
        <input
          type="text"
          placeholder="Никнейм"
          name="nickname"
          value={formData.nickname}
          onChange={(e) => handleChange(e)}
          className="mb-10 border-b-2 pb-2 text-xl lg:text-lg"
          disabled={submit ? true : false}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="mb-10 border-b-2 pb-2 text-xl lg:text-lg"
          onChange={(e) => handleChange(e)}
          disabled={submit ? true : false}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          className="mb-10 border-b-2 pb-2 text-xl lg:text-lg"
          onChange={(e) => handleChange(e)}
          disabled={submit ? true : false}
        />
        <input
          type="password"
          name="passwordRepeat"
          placeholder="Повторите пароль"
          value={formData.passwordRepeat}
          className="mb-10 border-b-2 pb-2 text-xl lg:text-lg"
          onChange={(e) => handleChange(e)}
          disabled={submit ? true : false}
        />
        <label className="block w-full mb-10 text-left border-b-2 py-2">
          Выберите фотографию
          <input
            type="file"
            name="img"
            onChange={(e) => handleChange(e)}
            className="mb-10 hidden pb-2"
            disabled={submit ? true : false}
          />
        </label>
        {submit && (
          <>
            <input
              type="text"
              placeholder="Код активации"
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
              className="mb-10 border-b-2 pb-2 text-xl lg:text-lg"
            />
            <button
              onClick={(e) => handleSubmiActiveCode(e)}
              className="bg-black text-white py-5 font-bold text-base rounded-2xl"
            >
              Отправить код
            </button>
          </>
        )}
        {!submit && (
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-black text-white py-5 font-bold text-base rounded-2xl"
          >
            Зарегестрироваться
          </button>
        )}
        <Link to={"/login"}>Уже зарегестрированы?</Link>
      </form>
    </div>
  );
};

export default SignIn;
