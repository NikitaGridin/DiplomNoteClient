import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import userStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { loginReq } from "../fetch/post";
import Bg_o from "../assets/bg_o.svg";
import Bg_t from "../assets/bg_t.svg";
import Bg_f from "../assets/bg_f.svg";
import Back from "../assets/back.svg";
import Logo from "../assets/logo.svg";
import Message from "../Components/Message";

const Login = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState();

  const handleChangeNickname = (e) => setNickname(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  React.useEffect(() => {
    if (message) {
      setMessage(message);
      setTimeout(() => {
        setMessage();
      }, 3000);
    }
  }, [message]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginReq(nickname, password);
      navigate(`/author/${userStore.userData.id}`, { replace: true });
    } catch (error) {
      setMessage(error?.response?.data);
    }
  };

  return (
    <div className="fixed top-0 w-full z-10 py-40 h-screen bg-gradient-to-b from-[#22caff] to-[#2229e9]">
      <img src={Bg_o} alt="" className="absolute bottom-0" />
      <img src={Bg_t} alt="" className="absolute top-0" />
      <img src={Bg_f} alt="" className="absolute right-0 bottom-0" />
      {message && <Message bg={"bg-red-500"} text={message} />}
      {userStore.isAuth && <Navigate to="/profile" />}
      {!userStore.isAuth && (
        <>
          <form
            action=""
            className="grid grid-cols-1 w-1/4 mx-auto text-center py-8 px-16 bg-white rounded-xl relative"
          >
            {" "}
            <Link
              to={"/"}
              className="rounded-full shadow-lg py-5 px-6 border absolute top-10 -left-8 bg-white"
            >
              <img src={Back} alt="" />
            </Link>{" "}
            <img src={Logo} alt="" className="mx-auto w-20 mb-7" />
            <h1 className="text-2xl font-semibold mb-11">С возвращением!</h1>
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => handleChangeNickname(e)}
              className="mb-10 border-b-2 pb-2"
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChangePassword(e)}
              className="mb-10 border-b-2 pb-2"
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-black text-white py-5 font-bold text-base rounded-2xl"
            >
              Войти
            </button>
            <Link to={"/signIn"}>Ещё не зарегестрированы?</Link>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
